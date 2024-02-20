import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Authentication/Login';
import Listings from './Profile/Listings';
import Details from './Profile/Details';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile/listings" element={<Listings />} />
        <Route path="/profile/details/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
