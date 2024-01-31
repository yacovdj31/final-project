// const express = require('express')

// // controller functions
// const { loginUser, signupUser } = require('../controllers/userController')

// const router = express.Router()

// // login route
// router.post('/login', loginUser)

// // signup route
// router.post('/signup', signupUser)

// module.exports = router


const express = require('express');
const multer = require('multer');
const { loginUser, signupUser } = require('../controllers/userController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/login', loginUser);
router.post('/signup', upload.single('photo'), signupUser);

module.exports = router;
