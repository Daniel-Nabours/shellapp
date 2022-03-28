import "./rightbar.css"

export default function RightBar() {
  return (
    <div className="rightbar" data-testid="rightBar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <span className="birthdayText">
            <b>John Doe</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {/* map user friends */}
        </ul>
      </div>
    </div>
  )
}