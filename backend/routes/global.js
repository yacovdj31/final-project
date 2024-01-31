const express = require('express');
const MathController = require('../controllers/mathController');
const ScrambleController = require('../controllers/scrambleController');
const router = express.Router();

router.get('/math', MathController.getAllMathPublic);

router.get('/math', MathController.getMathPublic);

router.get('/math', MathController.createMathPublic);

router.get('/math', MathController.updateMathPublic);

router.post('/math', MathController.comment)


// router.post('/math/', MathController.postRating); // Post a rating for a math record

router.post('/:id/rating', MathController.postRating); // Assuming postRating is the correct controller function

router.get('/math/', MathController.getRatings);

router.get('/scramble', ScrambleController.getAllScramblePublic);

router.get('/scramble', ScrambleController.getScramblePublic);

router.post('/scramble', ScrambleController.commentScramble)

router.post('/scramble/', ScrambleController.postRating); // Post a rating for a math record

router.get('/scramble/', ScrambleController.getRatings);

module.exports = router;





