import React, { useEffect, useReducer, useRef } from 'react';
import "./style.css"
import { useSelector } from 'react-redux';
import CreatePost from '../../components/createPost';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import SendVerification from '../../components/home/sendVerification';
import Post from '../../components/post';
import { useState } from 'react';


export default function Home({ setVisible, posts, getAllPost, dispatch }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [height, setHeight] = useState('');
  const middle = useRef(null);

  useEffect(() => {
    getAllPost(dispatch,user);
  }, [user]);

  useEffect(() => {
    setHeight(middle.current.clientHeight)
  }, [])

  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="home"  />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  )
}
