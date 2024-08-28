import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/Auth";
import { Chat } from "./pages/Chat";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <>
      <Routes>
        {/*  create all routes  */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
