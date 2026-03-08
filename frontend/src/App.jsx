import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notes from "./pages/Notes";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { Context } from "./context/Context";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const { token } = useContext(Context);
  return (
    <>
      
      <BrowserRouter>
        <Toaster />
        <Navbar />
      <Routes>
  
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/notes"
          element={
            token ? (
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;