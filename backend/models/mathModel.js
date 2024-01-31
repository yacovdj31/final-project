

// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;
// const mathSchema = new Schema({
//   num1: {
//     type: Number,
//     required: true,
//   },
//   num2: {
//     type: Number,
//     required: true,
//   },
//   operation: {
//     type: String,
//     required: true,
//   },
//   result: {
//     type: Number,
//     required: true,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model('Math', mathSchema);




const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const mathSchema = new Schema({
  num1: {
    type: Number,
    required: true,
  },
  num2: {
    type: Number,
    required: true,
  },
  operation: {
    type: String,
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  userStatus: {
    type: Map,
    of: Boolean,
    default: () => ({}),
  },
}, { timestamps: true });

module.exports = mongoose.model('Math', mathSchema);


