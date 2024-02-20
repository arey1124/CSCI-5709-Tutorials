import React, { useEffect, useState } from 'react';
import "./Listings.css";
import axios from "axios";
import { useParams } from 'react-router-dom';
import './Details.css';

function Details({route}) {
    const { id } = useParams();
    const API_URL = `https://express-t4.onrender.com/api/users/${id}`;
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(API_URL)
        .then(response => {
            setData(response.data);
            console.log(JSON.stringify(data));
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="Profile">
            <div className="profile-details-div">
                <div className="profile-details">
                    <img src={data.picture} alt="Profile" className="profile-image" />
                    <h4 className="profile-name">{data.name}</h4>
                    <p>Email : <span className="muted-text">{data.email}</span></p>
                    <p>Phone : <span className="muted-text">{data.phone}</span></p>
                    <p>Address : <span className="muted-text">{data.address}</span></p>
                    <p>Company : <span className="muted-text">{data.company}</span></p>
                    <p>Balance : <span className="muted-text">{data.balance}</span></p>
                    <p>Age : <span className="muted-text">{data.age}</span></p>
                    <p>Gender : <span className="muted-text">{data.gender}</span></p>
                    <p>Eye Colour : <span className="muted-text">{data.eyeColor}</span></p>
                    <p className='about-text'>About : <br/><span className="muted-text">{data.about}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Details;
