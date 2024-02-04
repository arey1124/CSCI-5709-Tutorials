import { Routes, Route } from "react-router-dom";
import Registration from "./Registration/Registration";
import Profile from "./Profile/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
