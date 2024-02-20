import React, { useEffect, useState } from 'react';
import "./Listings.css";
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Listings() {
    let navigate = useNavigate();
    const API_URL = 'https://express-t4.onrender.com/api/users';
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        axios.get(API_URL)
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const handleClick = (userId) => {
        // Redirect to URL based on user ID
        navigate(`/profile/details/${userId}`);
    };

    return (
        <div>
            <Container>
                <Row className="mb-3" id="search-div">
                    <h2>User Details</h2>
                    <Col>
                        <Form.Control type="text" placeholder="Search user" value={searchTerm} onChange={handleSearch} />
                    </Col>
                </Row>
                <Row>
                    <div className="user-list">
                        {filteredUsers.map(user => (
                        <Card key={user.id} className="user-card" onClick={() => handleClick(user._id)}>
                            <Card.Body>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <Card.Title><img src={user.picture} alt={user.name}/> {user.name}</Card.Title>
                                        <Card.Text>
                                            Age: {user.age}<br />
                                            Gender: {user.gender}<br />
                                            Company: {user.company}<br />
                                            Email: {user.email}<br />
                                            Phone: {user.phone}<br />
                                        </Card.Text>
                                    </div>
                                </div>  
                            </Card.Body>
                        </Card>
                        ))}
                    </div>
                </Row>
            </Container>
            
        </div>
    );
}

export default Listings;
