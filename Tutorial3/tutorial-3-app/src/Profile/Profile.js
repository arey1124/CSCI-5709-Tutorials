import './Profile.css';
import profilelogo from '../assets/images/profile.png';

function Profile() {


  return (
    <div className="Profile">
        <header className="App-header">
        </header>
        <div className="profile-details-div">
            <img src={profilelogo} alt="Profile" className="profile-image" />
            <div className="profile-details">
                <h1 className="profile-name">Arihant Dugar</h1>
                <p className="profile-email">arihant.dugar@dal.ca</p>
            </div>
        </div>
    </div>
  );
}

export default Profile;