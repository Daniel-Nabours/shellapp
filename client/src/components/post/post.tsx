import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { FC, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../AuthContext";
import { iPost, iUser } from "../../types";
//@ts-ignore
import * as timeago from "timeago.js";
import avatar from "../../res/noAvatar.png";
import updoot from "../../res/like.png";
import heart from "../../res/heart.png";

interface proptypes {
  post: iPost;
}
const Post: FC<proptypes> = ({ post }) => {
  const [like, setLike] = useState(post.like ?? 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<iUser>(); 
  const { user: currentUser } = useAuthContext();

  useEffect(() => {
    setIsLiked((like) => !like);
  }, [currentUser._id, post.like]);

  useEffect(() => {
    fetchUser();
  }, [post.userId]);
  
  const fetchUser = async () => {
    if (post.userId === currentUser!._id) setUser(currentUser)
    else {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    }
  }

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={
                user && user.imgURI
                  ? user.imgURI
                  : avatar
              }
              alt=""
            />
            <span className="postUsername">{post.userId == currentUser._id ? currentUser.username : "John Doe"}</span>
            <span className="postDate">{timeago.format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          {post.imgURI && <img className="postImg" src={post.imgURI} alt="" />}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={updoot}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={heart}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{`${like > 0 ? like + " people like this" : "No likes"}`}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">no comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
