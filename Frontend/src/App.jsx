import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import './App.css'
import {SPA_PATH} from './const.js'


function App() {
  const [spaPath, setSpaPath] = useState(SPA_PATH.LOGIN)

  return (
      <>
      <Header setSpaPath={setSpaPath}/>
      <h1>{spaPath}</h1>
      </>
  )
}

export default App
