import { useEffect, useRef, useState } from "react";
import { Return, Search } from "../../svg";
import useClickOutside from "../../helpers/clickOutside";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function SearchMenu({ color, setShowSearchMenu }) {
  const { user } = useSelector((state) => ({ ...state }))
  const [iconVisible, setIconVisible] = useState(true);
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const menu = useRef(null);
  const input = useRef(null);
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });
  useEffect(() => {
    input.current.focus();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (query !== "") {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/search?q=${query}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          })
        setData(data)
      }
    }

    fetchUsers();
  }, [query])

  console.log(data);
  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Nearby"
            onChange={(e) => { setQuery(e.target.value) }}
            ref={input}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      <div className="search_history_header">
        {/* <span>Recent searches</span>
        <a>Edit</a> */}
      </div>
      {/* <div className="search_history"></div> */}
      <div className="search_results scrollbar" >
        {data.map((user) => (
          <Link to={`/profile/${user.username}`} key={user._id} className="userSearch">
            <img src={user.picture} alt="" />
            <div className="userName">{user.first_name}</div>
          </Link>
        ))}
      </div>
    </div>

  );
}
