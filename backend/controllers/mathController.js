const Math = require("../models/mathModel");

const getAllMath = async (req, res) => {
  try {
    const maths = await Math.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(maths);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllMathPublic = async (req, res) => {
  try {
    const maths = await Math.find({})
      .populate("user", "photo")
      .sort({ createdAt: -1 });

    const mathsProcessed = maths.map((item) => {
      let averageRating = 0;
      if (item.ratings.length > 0) {
        averageRating =
          item.ratings.reduce((acc, r) => acc + r.value, 0) /
          item.ratings.length;
      }

      const itemObject = item.toObject();

      const userPhoto = item.user ? item.user.photo : null;

      return {
        ...itemObject,
        averageRating,
        userPhoto,
      };
    });

    res.json(mathsProcessed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMath = async (req, res) => {
  const { id } = req.params;

  const math = await Math.findOne({ _id: id, user: req.user._id });

  if (!math) {
    return res.status(404).json({ error: "No such math record" });
  }
  res.status(200).json(math);
};

const getMathPublic = async (req, res) => {
  const { id } = req.params;

  const math = await Math.findOne({ _id: id });

  if (!math) {
    return res.status(404).json({ error: "No such math record" });
  }
  res.status(200).json(math);
};

const createMathPublic = async (req, res) => {
  const { num1, num2, operation, result, comments, ratings } = req.body;

  try {
    const math = await Math.create({
      num1,
      num2,
      operation,
      result,
      comments,
      ratings,
      user: req.user._id,
    });
    res.status(200).json(math);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateMathPublic = async (req, res) => {
  const { id } = req.params;
  const { num1, num2, operation, result, comments, ratings } = req.body;

  try {
    const math = await Math.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { num1, num2, operation, result, comments, ratings },
      { new: true }
    );
    if (!math) {
      return res.status(404).json({ error: "No such math record" });
    }
    res.status(200).json(math);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMath = async (req, res) => {
  const { id } = req.params;

  const math = await Math.findOneAndDelete({ _id: id, user: req.user._id });

  if (!math) {
    return res.status(404).json({ error: "No such math record" });
  }
  res.status(200).json(math);
};

// UPDATE a math record
const updateMath = async (req, res) => {
  const { id } = req.params;

  const math = await Math.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { ...req.body },
    { new: true }
  );

  if (!math) {
    return res.status(404).json({ error: "No such math record" });
  }
  res.status(200).json(math);
};

const comment = async (req, res) => {
  const { id } = req.params;
  const { text, rating } = req.body;

  try {
    const math = await Math.findById(id);
    if (!math) {
      return res.status(404).json({ error: "Math question not found" });
    }
    const newComment = { user: req.user._id, text, rating };
    math.comments.push(newComment);
    await math.save();
    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postRating = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const ratingValue = req.body.value;

  try {
    const mathItem = await Math.findById(id);
    if (!mathItem) {
      return res.status(404).json({ error: "Math item not found" });
    }

    mathItem.ratings.push({ user: userId, value: ratingValue });

    await mathItem.save();
    res.status(200).json({ message: "Rating added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRatings = async (req, res) => {
  const { id } = req.params;
  try {
    const math = await Math.findById(id);
    if (!math) {
      return res.status(404).json({ error: "Math record not found" });
    }
    res.status(200).json(math.ratings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const toggleStatus = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const newStatus = req.body.status;

  try {
    const mathItem = await Math.findById(id);
    if (!mathItem) {
      return res.status(404).json({ error: "Math item not found" });
    }

    if (!mathItem.userStatus) {
      mathItem.userStatus = new Map();
    }

    mathItem.userStatus.set(userId.toString(), { status: newStatus });

    await mathItem.save();
    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error("Error toggling item status", error);
  }
};

const getToggledMath = async (req, res) => {
  try {
    const userId = req.user.id;

    const mathItems = await Math.find({
      userStatus: { $elemMatch: { $eq: { userId, status: true } } },
    });

    res.json(mathItems);
  } catch (error) {
    console.error("Error fetching toggled math items", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createMath = async (req, res) => {
  const { num1, num2, operation, result } = req.body;

  try {
    const math = await Math.create({
      num1,
      num2,
      operation,
      result,
      user: req.user._id,
    });
    res.status(200).json(math);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const toggleMathStatusForUser = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id.toString();

  try {
    const mathItem = await Math.findById(id);
    if (!mathItem) {
      return res.status(404).json({ error: "Math item not found" });
    }

    const currentStatus = mathItem.userStatus.get(userId) || false;
    mathItem.userStatus.set(userId, !currentStatus);
    await mathItem.save();

    res.json({ newStatus: !currentStatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getToggledMathForUser = async (req, res) => {
  try {
    let queryKey = `userStatus.${req.user._id}`;
    console.log("Querying with key:", queryKey);

    const maths = await Math.find({ [queryKey]: true });
    console.log("Fetched maths:", maths);
    res.json(maths);
  } catch (error) {
    console.error("Error in getToggledMathForUser:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMath,
  getAllMathPublic,
  getMathPublic,
  createMathPublic,
  updateMathPublic,
  getMath,
  createMath,
  deleteMath,
  updateMath,
  comment,
  postRating,
  getRatings,
  toggleStatus,
  getToggledMath,
  toggleMathStatusForUser,
  getToggledMathForUser,
};
