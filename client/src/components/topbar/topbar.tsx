import './topbar.css'
import { useState, memo, FC, ChangeEvent } from 'react'
import { Search, Person, Notifications, Chat } from "@mui/icons-material"

const TopBar:FC = () => {

  const [searchtext, setsearchtext] = useState("")

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setsearchtext(e.target.value)
  }
  return (
    <div className="topBarContainer">
      <div className="topBarLeft"> 
          <span className="logo">Social Media App</span> 
      </div>
      <div className="topBarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            value={searchtext}
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="topBarRight">
        <div className="topBarLinks">
          <span className="topBarLink">Home</span>
          <span className="topBarLink">News feed</span>
        </div>
        <div className="topBarIcons">
          <div className="topBarIconItem">
            <Person />
          </div>
          <div className="topBarIconItem">
            <Chat />
          </div>
          <div className="topBarIconItem">
            <Notifications />
            <span className="topBarIconBadge">1</span>
          </div>
        </div> 
      </div>
    </div>
  )
}
export default memo(TopBar)