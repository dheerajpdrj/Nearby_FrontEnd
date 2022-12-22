import { Link, useNavigate } from "react-router-dom";
import { Messenger } from "../../../svg";
import axios from 'axios'
import { useSelector } from "react-redux";

export default function Contact({ friend }) {
  const { user } = useSelector((state) => ({ ...state }))
  const navigate = useNavigate();
  const handleChat = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat`,
        {
          senderId: user.id,
          receiverId: friend._id
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
    <div className="friendsMessage">
      <Link to={`/profile/${friend.username}`} className="contact hover3">
        <div className="contact_img">
          <img src={friend.picture} alt="" />
        </div>
        <span>
          {friend.first_name} {friend.last_name}
        </span>
      </Link>
      <div className="circle_icon hover1" onClick={handleChat}>
        <Messenger />
      </div>
    </div>
  );
}
