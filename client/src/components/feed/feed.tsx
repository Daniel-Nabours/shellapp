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
      const res = props.username
        ? await axios.get("/posts/profile/" + props.username)
        : await axios.get("/posts/timeline/" + user._id);
      setPosts(dateSort(res.data));
    };
    fetchPosts();
  }, [props.username, user._id]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/events");
    ws.onmessage = handleNewPost;
    ws.onerror = (e) => {
      console.log("err:", e);
    };
    ws.onopen = (e) => {
      console.log("open:", e);
    };
    //this will run when the component unmounts
    return () => {
      ws.close();
    };
  }, []);
  const dateSort = (arr: iPost[]) => {
    return arr.sort((p1: iPost, p2: iPost) => {
      let d1 = new Date(p1.createdAt);
      let d2 = new Date(p2.createdAt);
      //typescript cant subtract dates so
      //@ts-ignore
      return d2 - d1;
    });
  }
  const handleNewPost = (e: Event) => {
    let event = e as MessageEvent;
    let data: { post: iPost; action: string } = JSON.parse(event.data);
    setPosts((prev) => {
      prev.push(data["post"]);
      prev = dateSort(prev);
      return [...prev];
    });
  };

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
