import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom"
import CreatePostPopup from "../components/createPostPopup";
import Home from "../pages/home";
import Activate from "../pages/home/activate";
import Login from "../pages/login";
import Profile from "../pages/profile";
import LoggedInRoutes from "../routes/LoggedInRoutes";
import NotLoggedInRoutes from "../routes/NotLoggedInRoutes";
import { postsReducer } from "../functions/reducers";
import { getAllPost } from "../functions/getAllPosts";
import Chat from "../pages/Chat/Chat";
import FriendsPage from "../pages/FriendsPage/FriendsPage";


export default function AllRoutes () {
    const { user } = useSelector((state) => ({ ...state }))
    const [visible, setVisible] = useState(false);
    const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
      loading: false,
      error: "",
      posts: []
    });
  
  
    return (
        <div>
            {visible && <CreatePostPopup user={user} setVisible={setVisible} posts={posts} dispatch={dispatch} />}
            <Routes>
                <Route element={<LoggedInRoutes />} >
                    <Route path="/profile" element={<Profile setVisible={setVisible} />} exact />
                    <Route path="/profile/:username" element={<Profile setVisible={setVisible} />} exact />
                    <Route path="/" element={ <Home setVisible={setVisible} posts={posts} dispatch={dispatch} getAllPost={getAllPost} /> } exact />
                    <Route path="/activate/:token" element={<Activate />} exact />
                    <Route path="/chats" element={ <Chat /> } exact />
                    <Route path="/friends" element={ <FriendsPage setVisible={setVisible} /> } exact />
                    <Route path="/friends/:type" element={ <FriendsPage setVisible={setVisible} /> } exact />
                </Route>

                <Route element={<NotLoggedInRoutes />}>
                    <Route path="/login" element={<Login />} exact />
                </Route>

            </Routes>
        </div>
    )
}
