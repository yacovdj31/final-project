// const express = require("express");
// const {

//   getAllMath,
//   getAllMathPublic,
//   getMathPublic,
//   createMathPublic,
//   updateMathPublic,
//   getMath,
//   createMath,
//   deleteMath,
//   updateMath,
//   comment,
//   postRating,
//   getRatings,
//   toggleStatus,
//   getToggle,
//   // correctCreate,
//   // correctGet
// } = require("../controllers/mathController");
// const requireAuth = require('../middleware/requireAuth')
// const router = express.Router();

// router.get("/public", getAllMathPublic);

// router.get("/public/:id", getMathPublic);

// router.get("/public/:id", createMathPublic);

// router.get("/public/:id", getMathPublic);

// router.patch("/:id", updateMath);

// router.patch("/:id", updateMathPublic);







// router.use(requireAuth)

// router.get("/", getAllMath);

// router.get("/:id", getMath);

// router.post("/", createMath);

// router.delete("/:id", deleteMath);

// router.post('/:id/comment', requireAuth, comment)

// router.post('/:id/rating', requireAuth, postRating);

// router.get('/:id/rating', requireAuth, getRatings);

// // router.post('/:id/submit-correctness', correctCreate)

// // router.get('/:id/submit-answers', correctGet)

// // router.get("/profile", requireAuth, correctGet);

// router.patch('/:id/toggleStatus', requireAuth, toggleStatus);

// router.get('/user-toggled-math', requireAuth, getToggle);





// module.exports = router;




// const express = require("express");
// const router = express.Router();
// const requireAuth = require('../middleware/requireAuth');
// const mathController = require("../controllers/mathController");

// // Public routes
// router.get("/public", mathController.getAllMathPublic);
// router.get("/public/:id", mathController.getMathPublic);
// router.post("/public", mathController.createMathPublic);

// // Private routes (require authentication)
// router.use(requireAuth); // All routes below this middleware require authentication

// router.get("/", mathController.getAllMath);
// router.get("/:id", mathController.getMath);
// router.post("/", mathController.createMath);
// router.delete("/:id", mathController.deleteMath);
// router.patch("/:id", mathController.updateMath);
// router.post('/:id/comment', mathController.comment);
// router.post('/:id/rating', mathController.postRating);
// router.get('/:id/rating', mathController.getRatings);
// router.patch('/:id/toggleStatus', mathController.toggleStatus);
// router.get('/user-toggled-math', mathController.getToggle);

// module.exports = router;

const express = require("express");
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const mathController = require("../controllers/mathController");

// Public routes
router.get("/public", mathController.getAllMathPublic);
router.get("/public/:id", mathController.getMathPublic);
router.post("/public", mathController.createMathPublic);

router.get('/user-math', requireAuth, mathController.getToggledMathForUser);
// Private routes (require authentication)
router.use(requireAuth); // All routes below this middleware require authentication


router.patch("/toggleStatus/:id", requireAuth, mathController.toggleMathStatusForUser);

router.get("/", mathController.getAllMath);
router.get("/:id", mathController.getMath);
router.post("/", mathController.createMath);
router.delete("/:id", mathController.deleteMath);
router.patch("/:id", mathController.updateMath);
router.post('/:id/comment', mathController.comment);
router.post('/:id/rating', requireAuth, mathController.postRating);
router.get('/:id/rating', mathController.getRatings);

// Updated route for displaying toggled math elements


module.exports = router;
