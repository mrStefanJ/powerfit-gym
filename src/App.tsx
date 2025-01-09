import { Route, Routes } from "react-router";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import { Admin, Home, Training, User, Users } from "./pages";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/training"
        element={
          <ProtectedRoute>
            <Training />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/user/:id"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
