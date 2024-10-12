import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/Auth";
import { Chat } from "./pages/Chat";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";


function App() {
  return (
    <>
      <Routes>
        {/*  create all routes  */}
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
