require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.UJET_SECRET, { expiresIn: '600s' });
}

app.post('/api/ujet/sign', (req, res) => {
    const token = generateAccessToken({ payload: req.body.payload });
    res.json({ token: token });
});

app.listen(3000, console.log('app is running on port 3000'))