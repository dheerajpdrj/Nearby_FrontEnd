

export default function Friends({ followers, following }) {

    return (
        <>
            <div className="profile_card">
                <div className="profile_card_header">
                    Following
                </div>
                <div className="profile_card_count">
                    {following?.length === 0 ? ""
                        : following?.length === 1 ? "1 followers"
                            : `${following?.length} followers`}
                </div>
                <div className="profile_card_grid">
                    {following &&
                        following.length &&
                        following.slice(0, 9).map((followingg,i) => (<div className='profile_photo_card' key={i} >
                            <img src={followingg.picture} alt="" />
                            <span>{followingg.first_name} {followingg.last_name}</span>
                        </div>))}
                </div>
            </div>

            <div className="profile_card">
                <div className="profile_card_header" style={{ marginBottom: "15px" }}>
                    Followers
                </div>
                <div className="profile_card_count">
                    {followers?.length === 0 ? ""
                        : followers?.length === 1 ? "1 following"
                            : `${followers?.length} following`}
                </div>
                <div className="profile_card_grid">
                    {followers &&
                        followers.length &&
                        followers.slice(0, 9).map((follower, i) => (<div className='profile_photo_card' key={i} >
                            <img src={follower.picture} alt="" />
                            <span>{follower.first_name} {follower.last_name}</span></div>))}
                </div>
            </div>
        </>
    )
}
