import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import { PostIdPage } from "../pages/PostIdPage";
import { routeArray } from "../router";
import Login from "../pages/Login";
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";


const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading){
        return <Loader/>
    };
    return (
        isAuth 
            ?
            <Routes>
                <Route path="/" />
                <Route path="/about" key='/about' element={<About />} />
                <Route exact path="/posts" key='/posts' element={<Posts />} />
                <Route exact path="/posts/:id" key='/posts/:id' element={<PostIdPage />} />
                <Route path="*" element={<Error />} />
            </Routes>
            :
            <Routes>
                <Route path="/login" key='/login' element={<Login />} />
                <Route path="*" element={<Login />} />
            </Routes>
    );
};

export default AppRouter;