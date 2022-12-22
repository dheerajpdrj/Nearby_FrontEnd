import axios from 'axios'
import { useState } from 'react'

import ('./style.scss')

export default function SendVerification({user}) {
    
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const sendVerificationLInk = async ()=>{
        try {
            const {data} = axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendVerification`,{},{
                headers:{
                    Authorization : `Bearer ${user.token}`
                }
            })
            setSuccess(data.message);
        } catch (error) {
            setError(error.response.data.message);
        }
    }
  return (
    <div className='send_verification'>
        <span>
        Your account is not verified,verify your account before it gets deleted
        after a month from creating.
        </span>
        <a 
        onClick={()=>{
            sendVerificationLInk();
        }}>
        Click here to resend verification link
        </a>
        {success && <div className='success_text'>{success}</div>}
        {error && <div className='error_text'>{error}</div>}
    </div>
  )
}
