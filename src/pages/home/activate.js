import React, { useState, useEffect } from 'react';
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../../components/createPost';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import ActivateForm from './ActivateForm';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


export default function Activate() {
  const dispatch = useDispatch()
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((user) => ({ ...user }))
  const {token} = useParams();
  const navigate = useNavigate();
  console.log(token);
  useEffect(() => {
    activateAccount()
  }, []);

  const activateAccount = async ()=>{
    try {
      setLoading(true);
      const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/activate`,
      {token},
      {
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      })

      setSuccess(data.message);
      Cookies.set("user", JSON.stringify({...user,verified:true}));
      dispatch({
        type: "VERIFY",
        payload:true
      });
      setTimeout(() => {
        navigate("/")
      }, 3000);
    } catch (error) {
      setError(error.response.data.message)
      setTimeout(() => {
        navigate("/")
      }, 3000);
    }
  }
  
  return (
    <div className="home">
      { success &&<ActivateForm 
      type="success"
      header="Account verification succeded"
      text = {success}
      loading= {true} />}


      {error && (<ActivateForm 
      type="error"
      header="Account verification failed"
      text = {error}
      loading= {loading} /> )}
      
      <Header />
      <LeftHome user={user} />
      <RightHome user={user} />
      <div className="home_middle">
        <CreatePost user={user} />
      </div>
    </div>
  )
}
