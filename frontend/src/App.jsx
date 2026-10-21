import Auth from "./pages/auth";
import Feed from "./pages/Feed";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/feed" element={<Feed />} />

    </Routes>
  );
}

export default App;