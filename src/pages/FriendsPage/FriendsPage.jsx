import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Header from '../../components/header'
import { getFriendsPageInfos } from '../../functions/user'
import Card from './Card'
import './style.css'

export default function FriendsPage() {

    const [friends, setFriends] = useState([]);
    const { type } = useParams();

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const data = await getFriendsPageInfos(user.token);
        setFriends(data);
    }

    return (
        <>
            <Header page={"friends"} />
            <div className="friends">
                <div className="friends_left">
                    <div className="friends_left_header">
                        <h3>Friends</h3>
                        {/* <div className="small_circle">
                            <i className="settings_filled_icon"></i>
                        </div> */}
                    </div>
                    <div className="friends_left_wrap">
                        <Link
                            to="/friends"
                            className={`mmenu_item hover3 ${type === undefined && "active_friends"
                                }`}
                        >
                            <div className="small_circle">
                                <i className="friends_home_icon "></i>
                            </div>
                            <span>Home</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>

                        <Link to={"/friends/following"} className={`mmenu_item hover3 ${type === "following" && "active_friends"
                            }`}>
                            <div className="small_circle">
                                <i className="friends_requests_icon"></i>
                            </div>
                            <span>Following</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>


                        <Link to={"/friends/followers"} className={`mmenu_item hover3 ${type === "followers" && "active_friends"
                            }`}>
                            <div className="small_circle">
                                <i className="friends_suggestions_icon"></i>
                            </div>
                            <span>Followers</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="friends_right">
                    {(type === undefined || type === "following") && (
                        <div className="friends_right_wrap">
                            <div className="friends_left_header">
                                <h3>Following</h3>
                                {type === undefined &&
                                    <Link to="/friends/following" className="see_link hover3">
                                        See all
                                    </Link>}

                            </div>
                            <div className="flex_wrap">
                                {friends.following &&
                                    friends.following.map((user) => (
                                        <Card user={user} key={user._id} type="following" />
                                    ))}
                            </div>
                        </div>
                    )}

                    {(type === undefined || type === "followers") && (
                        <div className="friends_right_wrap">
                            <div className="friends_left_header">
                                <h3>Followers</h3>
                                {type === undefined &&
                                    <Link to="/friends/followers" className="see_link hover3">
                                        See all
                                    </Link>
                                }

                            </div>
                            <div className="flex_wrap">
                                {friends.followers &&
                                    friends.followers.map((user) => (
                                        <Card user={user} key={user._id} type="followers" />
                                    ))}
                            </div>
                        </div>
                    )}


                    {/* <div className="friends_right_wrap">
            <div className="friends_left_header">
              <h3>Friends</h3>
              <a className="see_link hover3">See all</a>
            </div>
            <div className="flex_wrap">
              {data.friends &&
                data.friends.map((user) => (
                  <Card user={user} key={user._id} type="friends" />
                ))}
            </div>
          </div> */}
                </div>
            </div>
        </>
    )
}
