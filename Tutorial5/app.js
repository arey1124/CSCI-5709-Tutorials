const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid').v4;

const app = express();

app.use(bodyParser.json());

var users = [
    {
        email: "abcd@abc.com",
        firstName: "ABC",
        id: "5abf6783",
    },
    {
        email : "xyz@xyz.ca",
        firstName: "XYZ",
        id : "5abf674563",
    }
]

app.get('/users', async (req, res) => {
    try {
        return res.json({
            message: "Users retrieved",
            success: true,
            users: users,
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error retrieving users",
            success: false,
        })
    }
});

app.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const idx = users.findIndex(user => user.id === id);
        if (idx === -1) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        return res.json({ 
            success: true,
            user: users[idx]
        });
    } catch (error) {
        return res.json({
            message: "Error retrieving users",
            success: false,
        })
    }
});

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { email, firstName } = req.body;
    const idx = users.findIndex(user => user.id === id);
    if (idx === -1) {
        return res.status(404).json({ message: 'User not found', success: false });
    }
    if (email) {
        users[idx].email = email;
    }
    if (firstName) {
        users[idx].firstName = firstName;
    }

    return res.json({ message: 'User updated', success: true });
});

app.post('/add', (req, res) => {
    const { email, firstName } = req.body;
    const id = uuid();
    
    if(email && firstName) {
        users.push({email, firstName, id});
        return res.json({ message: 'User added', success: true });
    } else {
        return res.status(400).json({ message: 'Bad Request', success: false });
    }

});

module.exports = app;
