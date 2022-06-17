import React, { useState, useEffect, useRef } from "react";
import PostService from "../API/PostService";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/Loader/Loader";
import MyModal from "../components/UI/MyModal/MyModal";
import Pagination from "../components/UI/pagination/Pagination";
import PostFilter from "../components/UI/PostFilter";
import PostForm from "../components/UI/PostForm";
import MySelect from "../components/UI/select/MySelect";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";
import { usePosts } from "../hooks/usePost";
import "../styles/App.css";
import { getPageCount, getPagesArray } from "../utils/pages";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef()


  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const respons = await PostService.getAll(limit, page);
    setPosts([...posts, ...respons.data]);
    const totalCount = respons.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  // useObserver(lastElement, page < totalPages, isPostsLoading, () => {
  //   setPage(page + 1);
  // });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Create New Post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />

      <MySelect 
        value={limit} 
        onChange={value => setLimit(value)}
        defaultValue="Pages num"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Show all posts'},
        ]}
      />

      {postError && <h1>Error in server {postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchPosts}
        title="List 1"
      />
      <div style={{height: 20}}/>
      {isPostsLoading &&
        <div ref={lastElement} style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
          <Loader />
        </div>}

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
