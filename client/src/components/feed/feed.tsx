import { useContext, useEffect, useState } from "react";
import Post from "../post/post";
import Share from "../share/share";
import "./feed.css";
import axios from "axios";
import { useAuthContext } from "../../AuthContext";
import { iPost } from "../../types";

export default function Feed({ ...props }) {
  const [posts, setPosts] = useState<iPost[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/timeline/" + user._id);
      setPosts(dateSort(res.data));
    };
    fetchPosts();
  }, [props.username, user._id]); 
  const dateSort = (arr: iPost[]) => {
    return arr.sort((p1: iPost, p2: iPost) => { 
      return new Date(p2.createdAt).valueOf() - new Date(p1.createdAt).valueOf();
    });
  } 

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!props.username || props.username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
