// const Math = require("../models/mathModel");

// // GET all user-specific math records
// const getAllMath = async (req, res) => {
//   try {
//     const maths = await Math.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.status(200).json(maths);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // GET all math records (public)
// const getAllMathPublic = async (req, res) => {
//   try {
//     const maths = await Math.find({}).sort({ createdAt: -1 });
//     const mathsProcessed = maths.map((item) => {
//       let averageRating = 0;
//       if (item.ratings.length > 0) {
//         averageRating = item.ratings.reduce((acc, r) => acc + r.value, 0) / item.ratings.length;
//       }
//       return { ...item.toObject(), averageRating };
//     });
//     res.json(mathsProcessed);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // GET a single user-specific math record
// const getMath = async (req, res) => {
//   const { id } = req.params;

//   const math = await Math.findOne({ _id: id, user: req.user._id });

//   if (!math) {
//     return res.status(404).json({ error: "No such math record" });
//   }
//   res.status(200).json(math);
// };

// // GET a single math record (public)
// const getMathPublic = async (req, res) => {
//   const { id } = req.params;

//   const math = await Math.findOne({ _id: id });

//   if (!math) {
//     return res.status(404).json({ error: "No such math record" });
//   }
//   res.status(200).json(math);
// };

// // POST a new math record with comments and ratings
// const createMathPublic = async (req, res) => {
//   const { num1, num2, operation, result, comments, ratings } = req.body;

//   try {
//     const math = await Math.create({
//       num1,
//       num2,
//       operation,
//       result,
//       comments,
//       ratings,
//       user: req.user._id,
//     });
//     res.status(200).json(math);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // UPDATE a math record with comments and ratings
// const updateMathPublic = async (req, res) => {
//   const { id } = req.params;
//   const { num1, num2, operation, result, comments, ratings } = req.body;

//   try {
//     const math = await Math.findOneAndUpdate({ _id: id, user: req.user._id }, { num1, num2, operation, result, comments, ratings }, { new: true });
//     if (!math) {
//       return res.status(404).json({ error: "No such math record" });
//     }
//     res.status(200).json(math);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // DELETE a math record
// const deleteMath = async (req, res) => {
//   const { id } = req.params;

//   const math = await Math.findOneAndDelete({ _id: id, user: req.user._id });

//   if (!math) {
//     return res.status(404).json({ error: "No such math record" });
//   }
//   res.status(200).json(math);
// };

// // UPDATE a math record
// const updateMath = async (req, res) => {
//   const { id } = req.params;

//   const math = await Math.findOneAndUpdate({ _id: id, user: req.user._id }, { ...req.body }, { new: true });

//   if (!math) {
//     return res.status(404).json({ error: "No such math record" });
//   }
//   res.status(200).json(math);
// };

// // Add comment and rating to a math record
// const comment = async (req, res) => {
//   const { id } = req.params;
//   const { text, rating } = req.body;

//   try {
//     const math = await Math.findById(id);
//     if (!math) {
//       return res.status(404).json({ error: "Math question not found" });
//     }
//     const newComment = { user: req.user._id, text, rating };
//     math.comments.push(newComment);
//     await math.save();
//     res.status(200).json(newComment);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // POST a rating for a math record
// const postRating = async (req, res) => {
//   const { id } = req.params; // Math item ID
//   const userId = req.user._id; // ID of the user making the request
//   const ratingValue = req.body.value; // Rating value from the request body

//   try {
//     const mathItem = await Math.findById(id);
//     if (!mathItem) {
//       return res.status(404).json({ error: "Math item not found" });
//     }

//     // Add the rating to the ratings array
//     mathItem.ratings.push({ user: userId, value: ratingValue });

//     await mathItem.save();
//     res.status(200).json({ message: "Rating added successfully" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// // GET ratings for a math record
// const getRatings = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const math = await Math.findById(id);
//     if (!math) {
//       return res.status(404).json({ error: "Math record not found" });
//     }
//     res.status(200).json(math.ratings);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }

  
// };

// // const toggleStatus = async (req, res) => {
// //   const { id } = req.params; // Math item ID
// //   const userId = req.user._id; // ID of the user making the request
// //   const newStatus = req.body.status; // New status from the request body

// //   try {
// //     const mathItem = await Math.findById(id);
// //     if (!mathItem) {
// //       return res.status(404).json({ error: "Math item not found" });
// //     }

// //     // Initialize userStatus to false if it's not already set
// //     if (!mathItem.userStatus) {
// //       mathItem.userStatus = new Map();
// //     }

// //     // Set the status for the user
// //     mathItem.userStatus.set(userId.toString(), { status: newStatus });

// //     await mathItem.save();
// //     res.status(200).json({ message: "Status updated successfully" });
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // };

// // Update mathController.js

// const toggleStatus = async (req, res) => {
//   const { id } = req.params; // Math item ID
//   const userId = req.user._id; // ID of the user making the request
//   const newStatus = req.body.status; // New status from the request body

//   try {
//     const mathItem = await Math.findById(id);
//     if (!mathItem) {
//       return res.status(404).json({ error: "Math item not found" });
//     }

//     // Initialize userStatus to false if it's not already set
//     if (!mathItem.userStatus) {
//       mathItem.userStatus = new Map();
//     }

//     // Set the status for the user
//     mathItem.userStatus.set(userId.toString(), { status: newStatus });

//     await mathItem.save();
//     res.status(200).json({ message: "Status updated successfully" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//     console.error('Error toggling item status', error);
//   }
// };

// const getToggledMath = async (req, res) => {
//   try {
//     // Assuming you have a user ID in req.user
//     const userId = req.user.id;

//     // Fetch math records with userStatus set to true for the authenticated user
//     const mathItems = await Math.find({
//       userStatus: { $elemMatch: { $eq: { userId, status: true } } }
//     });

//     res.json(mathItems);
//   } catch (error) {
//     console.error('Error fetching toggled math items', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // const getToggledMath = async (req, res) => {
// //   try {
// //     const userId = req.user._id;

// //     // Fetch math records with userStatus set to true for the authenticated user
// //     const mathItems = await Math.find({
// //       userStatus: { $elemMatch: { $eq: { userId, status: true } } }
// //     });

// //     res.json(mathItems);
// //   } catch (error) {
// //     console.error('Error fetching toggled math items', error);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // };

// // POST a new math record
// const createMath = async (req, res) => {
//   const { num1, num2, operation, result } = req.body;

//   try {
//     const math = await Math.create({
//       num1,
//       num2,
//       operation,
//       result,
//       user: req.user._id,
//     });
//     res.status(200).json(math);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };const toggleMathStatusForUser = async (req, res) => {
//   const { id } = req.params;
//   const userId = req.user._id.toString(); // Ensure this is a string

//   try {
//     const mathItem = await Math.findById(id);
//     if (!mathItem) {
//       return res.status(404).json({ error: "Math item not found" });
//     }

//     // Toggle the status
//     const currentStatus = mathItem.userStatus.get(userId) || false;
//     mathItem.userStatus.set(userId, !currentStatus);

//     await mathItem.save();
//     res.status(200).json({ newStatus: !currentStatus });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// const getToggledMathForUser = async (req, res) => {
//   try {
//     // Construct the query key dynamically based on the user's ID
//     let queryKey = `userStatus.${req.user._id}.status`;

//     const maths = await Math.find({ [queryKey]: true });
//     res.json(maths);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



// module.exports = {
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
//   getToggledMath, // Add this to the module.exports
//   toggleMathStatusForUser,
//   getToggledMathForUser
// };









const Math = require("../models/mathModel");

// GET all user-specific math records
const getAllMath = async (req, res) => {
  try {
    const maths = await Math.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(maths);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllMathPublic = async (req, res) => {
  try {
    // Find all math items and populate user information
    const maths = await Math.find({}).populate('user', 'photo').sort({ createdAt: -1 });

    // Process each math item to calculate the average rating and include user photo
    const mathsProcessed = maths.map(item => {
      let averageRating = 0;
      if (item.ratings.length > 0) {
        averageRating = item.ratings.reduce((acc, r) => acc + r.value, 0) / item.ratings.length;
      }

      // Convert Mongoose document to object and add additional fields
      const itemObject = item.toObject();

      // Include user photo URL (if available) in the response
      const userPhoto = item.user ? item.user.photo : null;

      return {
        ...itemObject,
        averageRating,
        userPhoto // Add the user photo URL to each item
      };
    });

    res.json(mathsProcessed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a single user-specific math record
const getMath = async (req, res) => {
  const { id } = req.params;

  const math = await Math.findOne({ _id: id, user: req.user._id });

  if (!math) {
    return res.status(404).json({ error: "No such math record" });
  }
  res.status(200).json(math);
};

// GET a single math record (public)
const getMathPublic = async (req, res) => {
  const { id } = req.params;

  const math = await Math.findOne({ _id: id });

  if (!math) {
    return res.status(404).json({ error: "No such math record" });
  }
  res.status(200).json(math);
};

// POST a new math record with comments and ratings
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

// UPDATE a math record with comments and ratings
const updateMathPublic = async (req, res) => {
  const { id } = req.params;
  const { num1, num2, operation, result, comments, ratings } = req.body;

  try {
    const math = await Math.findOneAndUpdate({ _id: id, user: req.user._id }, { num1, num2, operation, result, comments, ratings }, { new: true });
    if (!math) {
      return res.status(404).json({ error: "No such math record" });
    }
    res.status(200).json(math);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a math record
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

  const math = await Math.findOneAndUpdate({ _id: id, user: req.user._id }, { ...req.body }, { new: true });

  if (!math) {
    return res.status(404).json({ error: "No such math record" });
  }
  res.status(200).json(math);
};

// Add comment and rating to a math record
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

// POST a rating for a math record
const postRating = async (req, res) => {
  const { id } = req.params; // Math item ID
  const userId = req.user._id; // ID of the user making the request
  const ratingValue = req.body.value; // Rating value from the request body

  try {
    const mathItem = await Math.findById(id);
    if (!mathItem) {
      return res.status(404).json({ error: "Math item not found" });
    }

    // Add the rating to the ratings array
    mathItem.ratings.push({ user: userId, value: ratingValue });

    await mathItem.save();
    res.status(200).json({ message: "Rating added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// GET ratings for a math record
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

// const toggleStatus = async (req, res) => {
//   const { id } = req.params; // Math item ID
//   const userId = req.user._id; // ID of the user making the request
//   const newStatus = req.body.status; // New status from the request body

//   try {
//     const mathItem = await Math.findById(id);
//     if (!mathItem) {
//       return res.status(404).json({ error: "Math item not found" });
//     }

//     // Initialize userStatus to false if it's not already set
//     if (!mathItem.userStatus) {
//       mathItem.userStatus = new Map();
//     }

//     // Set the status for the user
//     mathItem.userStatus.set(userId.toString(), { status: newStatus });

//     await mathItem.save();
//     res.status(200).json({ message: "Status updated successfully" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// Update mathController.js

const toggleStatus = async (req, res) => {
  const { id } = req.params; // Math item ID
  const userId = req.user._id; // ID of the user making the request
  const newStatus = req.body.status; // New status from the request body

  try {
    const mathItem = await Math.findById(id);
    if (!mathItem) {
      return res.status(404).json({ error: "Math item not found" });
    }

    // Initialize userStatus to false if it's not already set
    if (!mathItem.userStatus) {
      mathItem.userStatus = new Map();
    }

    // Set the status for the user
    mathItem.userStatus.set(userId.toString(), { status: newStatus });

    await mathItem.save();
    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error('Error toggling item status', error);
  }
};

const getToggledMath = async (req, res) => {
  try {
    // Assuming you have a user ID in req.user
    const userId = req.user.id;

    // Fetch math records with userStatus set to true for the authenticated user
    const mathItems = await Math.find({
      userStatus: { $elemMatch: { $eq: { userId, status: true } } }
    });

    res.json(mathItems);
  } catch (error) {
    console.error('Error fetching toggled math items', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// const getToggledMath = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     // Fetch math records with userStatus set to true for the authenticated user
//     const mathItems = await Math.find({
//       userStatus: { $elemMatch: { $eq: { userId, status: true } } }
//     });

//     res.json(mathItems);
//   } catch (error) {
//     console.error('Error fetching toggled math items', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// POST a new math record
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
};const toggleMathStatusForUser = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id.toString();

  try {
    const mathItem = await Math.findById(id);
    if (!mathItem) {
      return res.status(404).json({ error: "Math item not found" });
    }

    // Toggle logic remains the same
    const currentStatus = mathItem.userStatus.get(userId) || false;
    mathItem.userStatus.set(userId, !currentStatus);
    await mathItem.save();

    res.json({ newStatus: !currentStatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getToggledMathForUser =async (req, res) => {
  try {
    let queryKey = `userStatus.${req.user._id}`;
    console.log("Querying with key:", queryKey); // Logging for debugging

    const maths = await Math.find({ [queryKey]: true });
    console.log("Fetched maths:", maths); // Logging fetched data
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
  getToggledMath, // Add this to the module.exports
  toggleMathStatusForUser,
  getToggledMathForUser
};




