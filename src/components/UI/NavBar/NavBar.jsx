import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyButton from "../button/MyButton";
import { AuthContext } from '../../../context/index';

const NavBar = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    };
    return (
        <div className="navbar">
            {isAuth ? <MyButton onClick={logout}>Sign out</MyButton> : ''}
            <div className="navbar_links">
                <Link to="/about">About Us</Link>
                <Link to="/posts">Posts</Link>
            </div>
        </div>
    );
};

export default NavBar;