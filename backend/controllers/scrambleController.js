const Scramble = require("../models/ScrambleModel");

const getAllScramble = async (req, res) => {
  try {
    const scrambles = await Scramble.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(scrambles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllScramblePublic = async (req, res) => {
  try {
    const scrambles = await Scramble.find({}).sort({ createdAt: -1 });
    const scramblesProcessed = scrambles.map((item) => {
      let averageRating = 0;
      if (item.ratings.length > 0) {
        averageRating =
          item.ratings.reduce((acc, r) => acc + r.value, 0) /
          item.ratings.length;
      }
      return { ...item.toObject(), averageRating };
    });
    res.json(scramblesProcessed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getScramble = async (req, res) => {
  const { id } = req.params;

  const scramble = await Scramble.findOne({ _id: id, user: req.user._id });

  if (!scramble) {
    return res.status(404).json({ error: "No such scramble record" });
  }
  res.status(200).json(scramble);
};

const getScramblePublic = async (req, res) => {
  const { id } = req.params;

  const scramble = await Scramble.findOne({ _id: id });

  if (!scramble) {
    return res.status(404).json({ error: "No such scramble record" });
  }
  res.status(200).json(scramble);
};

const createScramble = async (req, res) => {
  const { original, scrambled } = req.body;

  try {
    const scramble = await Scramble.create({
      original,
      scrambled,
      user: req.user._id,
    });
    res.status(200).json(scramble);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteScramble = async (req, res) => {
  const { id } = req.params;

  const scramble = await Scramble.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!scramble) {
    return res.status(404).json({ error: "No such scramble record" });
  }
  res.status(200).json(scramble);
};

const updateScramble = async (req, res) => {
  const { id } = req.params;

  const scramble = await Scramble.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { ...req.body },
    { new: true }
  );

  if (!scramble) {
    return res.status(404).json({ error: "No such scramble record" });
  }
  res.status(200).json(scramble);
};

const commentScramble = async (req, res) => {
  const { id } = req.params;
  const { text, rating } = req.body;

  try {
    const scramble = await Scramble.findById(id);
    if (!scramble) {
      return res.status(404).json({ error: "Scramble question not found" });
    }

    const newComment = { user: req.user._id, text, rating };
    scramble.comments.push(newComment);
    await scramble.save();

    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postRating = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { value } = req.body;

  try {
    const scrambleItem = await Scramble.findById(id);
    if (!scrambleItem) {
      return res.status(404).json({ error: "Scramble item not found" });
    }

    const rating = {
      user: userId,
      value,
    };

    scrambleItem.ratings.push(rating);

    await scrambleItem.save();

    res.status(200).json(rating);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRatings = async (req, res) => {
  const { id } = req.params;

  try {
    const scrambleItem = await Scramble.findById(id);
    if (!scrambleItem) {
      return res.status(404).json({ error: "Scramble item not found" });
    }

    res.status(200).json(scrambleItem.ratings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const toggleScrambleStatusForUser = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id.toString();

  try {
    const scrambleItem = await Scramble.findById(id);
    if (!scrambleItem) {
      return res.status(404).json({ error: "Scramble item not found" });
    }

    const currentStatus = scrambleItem.userStatus.get(userId) || false;
    scrambleItem.userStatus.set(userId, !currentStatus);
    await scrambleItem.save();

    res.json({ newStatus: !currentStatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getToggledScrambleForUser = async (req, res) => {
  try {
    let queryKey = `userStatus.${req.user._id}`;
    console.log("Querying with key:", queryKey);

    const scrambles = await Scramble.find({ [queryKey]: true });
    console.log("Fetched scrambles:", scrambles);
    res.json(scrambles);
  } catch (error) {
    console.error("Error in getToggledScrambleForUser:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllScramble,
  getAllScramblePublic,
  getScramblePublic,
  getScramble,
  createScramble,
  deleteScramble,
  updateScramble,
  commentScramble,
  getRatings,
  postRating,
  toggleScrambleStatusForUser,
  getToggledScrambleForUser,
};
