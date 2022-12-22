import { Link } from "react-router-dom";

export default function Card({ user, type }) {
  return (
    <Link to={`/profile/${user.username}`} className="req_card">
      <div >
        <img src={user.picture} alt="" />
      </div>
      <div className="req_name">
        {user.first_name} {user.last_name}
      </div>
      {/* {type === "following" ? (
        <button className="blue_btn">Message</button>
      ) : type === "followers" ? (
        <>
          <button className="blue_btn">Message</button>
        </>
      ) : (
        ""
      )} */}
    </Link>
  );
}
