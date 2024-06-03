import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import './App.css'
import {SPA_PATH} from './const.js'
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Feed from "./pages/Feed/Feed.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Pending from "./pages/Pending/Pending.jsx";

function App() {
  const [spaPath, setSpaPath] = useState(SPA_PATH.LOGIN)

  return (
      <div>
          <Header setSpaPath={setSpaPath}/>
              {spaPath === SPA_PATH.LOGIN && <Login />}
              {spaPath === SPA_PATH.HOME && <Home />}
              {spaPath === SPA_PATH.FEED && <Feed />}
              {spaPath === SPA_PATH.PROFILE && <Profile />}
              {spaPath === SPA_PATH.PENDING && <Pending />}
      </div>
  )
}

export default App
