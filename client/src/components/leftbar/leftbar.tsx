import "./leftbar.css"
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material"

export default function LeftBar() {

  const defaultItems = [{
    text: "Feed",
    icon: <RssFeed className="leftbarIcon" />
  }, {
    text: "Chats",
    icon: <Chat className="leftbarIcon" />
  }, {
    text: "Videos",
    icon: <PlayCircleFilledOutlined className="leftbarIcon" />
  }, {
    text: "Groups",
    icon: <Group className="leftbarIcon" />
  }, {
    text: "Bookmarks",
    icon: <Bookmark className="leftbarIcon" />
  }, {
    text: "Questions",
    icon: <HelpOutline className="leftbarIcon" />
  }, {
    text: "Jobs",
    icon: <WorkOutline className="leftbarIcon" />
  }, {
    text: "Events",
    icon: <Event className="leftbarIcon" />
  }, {
    text: "Courses",
    icon: <School className="leftbarIcon" />
  }
  ]
  return (
    <div className="leftbar" data-testid="leftbarContainer">
      <div className="leftbarWrapper" >
        <ul className="leftbarList" data-testid="leftbarList">
          {defaultItems.map((item, idx) => (
            <li key={`leftListBar${item.text}${idx}`} className="leftbarListItem" >
              {item.icon}
              <span className="leftbarListItemText" data-testid="leftbarListItemText">{item.text}</span>
            </li>
          ))}
        </ul>
        <button className="leftbarButton" data-testid="leftbarShowMore">Show More</button>
        <hr className="leftbarHr" />
        <ul className="leftbarFriendList" data-testid="leftbarFriendList">
          {/* {map users here} */}
        </ul>
      </div>
    </div>
  )
}