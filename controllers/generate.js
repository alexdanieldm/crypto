const jwt = require('jsonwebtoken');
const router = require('express').Router();
const verifyToken = require('../handlers/verifyToken');

router.get('',(req, res) => {
    res.render('./pages/generate');
});