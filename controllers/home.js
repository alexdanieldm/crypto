const jwt = require('jsonwebtoken');
const router = require('express').Router();
const verifyToken = require('../handlers/verifyToken');

router.get('', verifyToken, (req, res) => {
    res.render('./pages/home', /*{message: 'Alex!'}*/);
});

module.exports = router;

// <!-- <%=message%> -->