const mongoose = require('mongoose');

const scrambleSchema = new mongoose.Schema({
    original: {
        type: String,
        required: true
    },
    scrambled: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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


module.exports = mongoose.model('Scramble', scrambleSchema);
