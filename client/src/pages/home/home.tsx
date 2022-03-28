import './home.css'
import React, { FC } from "react"
import LeftBar from "../../components/leftbar/leftbar"
import RightBar from "../../components/rightbar/rightbar"
import Topbar from "../../components/topbar/topbar"
import Feed from '../../components/feed/feed'

const HomePage: FC = () => {

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <LeftBar />
        <Feed/>
        <RightBar />
      </div>
    </>
  )
}

export default React.memo(HomePage)