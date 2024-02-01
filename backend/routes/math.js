const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const mathController = require("../controllers/mathController");

router.get("/public", mathController.getAllMathPublic);
router.get("/public/:id", mathController.getMathPublic);
router.post("/public", mathController.createMathPublic);

router.get("/user-math", requireAuth, mathController.getToggledMathForUser);

router.use(requireAuth);

router.patch(
  "/toggleStatus/:id",
  requireAuth,
  mathController.toggleMathStatusForUser
);

router.get("/", mathController.getAllMath);
router.get("/:id", mathController.getMath);
router.post("/", mathController.createMath);
router.delete("/:id", mathController.deleteMath);
router.patch("/:id", mathController.updateMath);
router.post("/:id/comment", mathController.comment);
router.post("/:id/rating", requireAuth, mathController.postRating);
router.get("/:id/rating", mathController.getRatings);

module.exports = router;
