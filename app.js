require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.UJET_SECRET, { algorithm: 'HS256' });
}

app.post('/auth/token', function (req, res) {
    const payload = req.body.payload
    payload['iss'] = 'UNORO'
    const iat = parseInt(Date.now() / 1000, 10)
    payload['iat'] = iat
    payload['exp'] = iat + 600
    const token = generateAccessToken(payload);
    res.json({ token })
});

const runningPort = process.env.PORT || 3000;
app.listen(runningPort, console.log(`app is running on port ${runningPort}`))