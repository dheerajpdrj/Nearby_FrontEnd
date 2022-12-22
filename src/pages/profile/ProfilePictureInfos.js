import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProfilePicture from "../../components/profilePicture";
import Friendship from "./Friendship";

export default function ProfielPictureInfos({ profile, visitor , photos }) {
    const [show, setShow] = useState(false);
    const showref = useRef(null)
    const propic = useRef(null);

    return (
        <div className="profile_img_wrap">
        {show && <ProfilePicture setShow={setShow} propic={propic} photos={photos} />}
        <div className="profile_w_left">
          <div className="profile_w_img">
            <div
              className="profile_w_bg"
              ref={propic}
              style={{
                backgroundSize: "cover",
                backgroundImage: `url(${profile.picture})`,
              }}
            ></div>
            {!visitor && (
              <div
                className="profile_circle hover1"
                onClick={() => setShow(true)}
              >
                <i className="camera_filled_icon"></i>
              </div>
            )}
          </div>
          <div className="profile_w_col">
            <div className="profile_name">
              {profile.first_name} {profile.last_name}
            </div>
            <div className="profile_friend_count">
              {profile?.friends && (
                <div className="profile_card_count">
                  {profile?.friends.length === 0
                    ? ""
                    : profile?.friends.length === 1
                    ? "1 Friend"
                    : `${profile?.friends.length} Friends`}
                </div>
              )}
            </div>
            <div className="profile_friend_imgs">
              {profile?.friends &&
                profile.friends.slice(0, 6).map((friend, i) => (
                  <Link to={`/profile/${friend.username}`} key={i}>
                    <img
                      src={friend.picture}
                      alt=""
                      style={{
                        transform: `translateX(${-i * 7}px)`,
                        zIndex: `${i}`,
                      }}
                    />
                  </Link>
                ))}
            </div>
          </div>
        </div>
        {visitor &&  <Friendship friendshipp={profile?.friendship} profileid={profile._id} />}
      </div>
    );
}
