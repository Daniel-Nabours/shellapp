import { useContext, useEffect, useState } from "react"
import "./feed.css"

export default function Feed() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    //fetch for posts here
  }, [])

  return (
    <div className="feed">
      <div className="feedWrapper"> 
        {posts.map((p) => (
           <></> //posts list here
        ))}
      </div>
    </div>
  )
}