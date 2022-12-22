import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducers";
import Header from "../../components/header";
import "./style.css";
import ProfielPictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import CreatePost from '../../components/createPost';
import Post from '../../components/post';
import Photos from "./Photos";
import Friends from "./Friends";
import CreatePostPopup from "../../components/createPostPopup";



export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [photos, setPhotos] = useState({}); 
  const [visible, setVisible] = useState(false); 
  var userName = username === undefined ? user.username : username;
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  useEffect(() => {
    getProfile();
  }, [userName,user.following]);
  
  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";
  
  let visitor = userName === user.username ? false : true;

  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.ok === false) {
        navigate("/profile");
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, max },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        setPhotos(images.data);
          
        } catch (error) {
          console.log(error);
        }
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };


  return (
    <div className="profile" >
       {visible && <CreatePostPopup user={user} setVisible={setVisible} posts={profile?.post} dispatch={dispatch} profile />}
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <ProfielPictureInfos profile={profile} visitor = {visitor} photos={photos.resources} />
          <ProfileMenu />
          <div className="profile_grid">
            <div className="profile_left">
              <Photos photos={photos} />
              <Friends followers={profile.followers} following={profile.following} />
            </div>
            <div className="profile_right">
              
              {!visitor && (<CreatePost user={user} profile setVisible={setVisible} /> ) }
              <div className="createPost">
                <div
                  className="createPost_header">
                  <div className="left_header_grid" style={{ fontSize: '1.5rem', fontWeight: '3rem' }}>Posts</div>
                </div>
              </div>
              <div className="posts">
                {profile?.post && profile.post.length? (profile.post.map((post)=>(
                  <Post user={user} post={post} key={post._id} profile />
                ))): (
                  <div className="no_posts">No Post Available</div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
