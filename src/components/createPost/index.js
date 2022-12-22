import { Photo } from "../../svg";
import "./style.css";
export default function CreatePost({ user ,setVisible}) {
  return (
    <div className="createPost" onClick={()=>setVisible(true)}>
      <div className="createPost_header">
        <img src={user?.picture} alt="" />
        <div className="open_post hover2">
          What's on your mind, {user?.first_name}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        
        <div className="createPost_icon hover1">
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        
      </div>
    </div>
  );
}


