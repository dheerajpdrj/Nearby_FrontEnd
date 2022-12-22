import axios from "axios";

export const getAllPost = async (dispatch,user)=>{

        try {
          dispatch({
            type: "POSTS_REQUEST",
          })
    
          const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`
              }
            });
          dispatch({
            type: 'POSTS_SUCCESS',
            payload: data
          })
    
        } catch (error) {
          dispatch({
            type: 'POSTS_ERROR',
            payload: error.response?.data.message
          })
        }
   
}
