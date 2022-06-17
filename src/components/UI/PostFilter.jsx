import React from "react";
import MySelect from "./select/MySelect";
import MyInput from "./input/MyInput";


const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
        <MyInput
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value})}
          placeholder="Search..."
        />
        <MySelect
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue="Sort by"
          options={[
            { value: "title", name: "by Title" },
            { value: "body", name: "by Body" },
          ]}
        />
      </div>
    );
};

export default PostFilter;