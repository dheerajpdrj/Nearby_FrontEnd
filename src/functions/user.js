import axios from "axios";

export const getUser = async (userId, token)=>{
try {
  const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getUser/${userId}`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data;

} catch (error) {
  return (error.response.data.message)
}
}

  export const follow = async (id, token) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/follow/${id}`,
        {},
  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  };


  export const unfollow = async (id, token) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/unfollow/${id}`,
        {},
  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  };

  export const getFriendsPageInfos = async (token) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getFriendsPageInfos`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  };
//   export const acceptRequest = async (id, token) => {
//     try {
//       const { data } = await axios.put(
//         `${process.env.REACT_APP_BACKEND_URL}/acceptRequest/${id}`,
//         {},
  
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return "ok";
//     } catch (error) {
//       return error.response.data.message;
//     }
//   };
//   export const unfriend = async (id, token) => {
//     try {
//       const { data } = await axios.put(
//         `${process.env.REACT_APP_BACKEND_URL}/unfriend/${id}`,
//         {},
  
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return "ok";
//     } catch (error) {
//       return error.response.data.message;
//     }
//   };
//   export const deleteRequest = async (id, token) => {
//     try {
//       const { data } = await axios.put(
//         `${process.env.REACT_APP_BACKEND_URL}/deleteRequest/${id}`,
//         {},
  
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return "ok";
//     } catch (error) {
//       return error.response.data.message;
//     }
//   };
  