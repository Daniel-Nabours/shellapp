import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { FormEvent, useContext, useRef, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../AuthContext";
import { iPost } from "../../types";
import avatar from "../../res/noAvatar.png";

export default function Share() {
  const { user } = useAuthContext();
  const desc = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const PF = "../../res";

  const sharePost = async () => {
    const newPost: iPost = {
      userId: user._id,
      desc: desc.current!.value,
      createdAt: `${Date.now()}`,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.imgURI &&= fileName; 
      try {
        await axios.post("/upload", data);
      }
      catch (err) { }
    }
    try { 
      await axios.post("/posts/create", newPost); 
    }
    catch (err) { }
  };

  const submitHandler = () => {
    sharePost();
    desc.current!.value = ""
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.imgURI ? PF + user.imgURI : avatar}
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel
              className="shareCancelImg"
              onClick={() => setFile(undefined)}
            />
          </div>
        )}
        <div className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files![0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button onClick={submitHandler} className="shareButton">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
