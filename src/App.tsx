import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import ChatRoom from "@/pages/ChatRoom"
import ChatList from "@/pages/ChatList"
import Profile from "@/pages/Profile"
import Layout from "@/components/layout/Layout"

const App = () => {

  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<ChatList />} />
            <Route path="/chatroom/:chatRoomId" element={<ChatRoom />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App

