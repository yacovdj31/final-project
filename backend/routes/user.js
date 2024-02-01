const express = require('express');
const multer = require('multer');
const { loginUser, signupUser } = require('../controllers/userController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/login', loginUser);
router.post('/signup', upload.single('photo'), signupUser);

module.exports = router;
