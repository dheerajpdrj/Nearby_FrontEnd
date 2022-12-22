import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
import { useSelector, useDispatch } from "react-redux";
import {
  follow,
  unfollow,
} from "../../functions/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Friendship({ friendshipp, profileid }) {
const navigate = useNavigate();
  const dispatch = useDispatch();
  const [friendship, setFriendship] = useState(friendshipp);
  useEffect(() => {
    setFriendship(friendshipp);
  }, [friendshipp]);
  const [friendsMenu, setFriendsMenu] = useState(false);
  const menu = useRef(null);

  useClickOutside(menu, () => setFriendsMenu(false));
  const { user } = useSelector((state) => ({ ...state }));

  const followHandler = async () => {
    setFriendship({ ...friendship, following: true });
    const data = await follow(profileid, user.token);
    dispatch({ type: "FOLLOW", payload: data })
  };

  const unfollowHandler = async () => {
    setFriendship({ ...friendship, following: false });
    const data = await unfollow(profileid, user.token);
    dispatch({ type: "FOLLOW", payload: data })
  };

  const handleChat = async()=>{
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat`,
        {
          senderId: user.id,
          receiverId: profileid,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

      if (data === "ok") {
        navigate(`/chats`)
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className="friendship">

      {friendship?.following ? (
        <button className="gray_btn" onClick={() => unfollowHandler()}>
          <img src="../../../icons/follow.png" alt="" />
          <span>Following</span>
        </button>
      ) : (
        <button className="blue_btn" onClick={() => followHandler()}>
          <img src="../../../icons/follow.png" className="invert" alt="" />
          <span>Follow</span>
        </button>
      )}
      {friendship?.following &&
        <button className={friendship?.following ? "blue_btn" : "gray_btn"} onClick={()=>{handleChat()}} >

          <img
            src="../../../icons/message.png"
            className={friendship?.friends && "invert"}
            alt=""
          />
          <span>Message</span>
        </button>
        }
    </div>
  );
}
