


// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const workoutRoutes = require('./routes/workouts');
// const userRoutes = require('./routes/user');
// const mathRoutes = require('./routes/math'); 
// const scrambleRoutes = require('./routes/scramble')

// const app = express();

// // Middleware
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// // Routes
// app.use('/api/workouts', workoutRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/math', mathRoutes);
// app.use('/api/scramble', scrambleRoutes);

// // Connect to DB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     // Listen for requests
//     app.listen(process.env.PORT, () => {
//       console.log('connected to db & listening on port', process.env.PORT);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });



// require('dotenv').config();

// const express = require('express');
// const cors = require('cors'); // Import cors
// const mongoose = require('mongoose');
// // const workoutRoutes = require('./routes/workouts');
// const userRoutes = require('./routes/user');
// const mathRoutes = require('./routes/math');
// const scrambleRoutes = require('./routes/scramble');
// const globalRoutes = require('./routes/global');

// const app = express();

// // Middleware
// app.use(express.json());

// // Enable CORS for requests from your frontend
// app.use(cors({
//   origin: 'http://localhost:3000' // Adjust this if your frontend is hosted on a different port
// }));

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// // Routes
// // app.use('/api/workouts', workoutRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/math', mathRoutes);
// app.use('/api/scramble', scrambleRoutes);
// app.use('/api/public', globalRoutes);

// // Connect to DB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     // Listen for requests
//     app.listen(process.env.PORT, () => {
//       console.log('connected to db & listening on port', process.env.PORT);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });





// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const userRoutes = require('./routes/user');
// const mathRoutes = require('./routes/math');
// const scrambleRoutes = require('./routes/scramble');
// const commentRoutes = require('./routes/comment');
// const globalRoutes = require('./routes/global');

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3000'
// }));

// app.use('/uploads', express.static('uploads')); 

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// app.use('/api/user', userRoutes);
// app.use('/api/math', mathRoutes);
// app.use('/api/scramble', scrambleRoutes);
// app.use('/api/comments', commentRoutes);
// app.use('/api/public', globalRoutes);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log('connected to db & listening on port', process.env.PORT);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });




require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const mathRoutes = require('./routes/math');
const scrambleRoutes = require('./routes/scramble');
const globalRoutes = require('./routes/global');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/math', mathRoutes);
app.use('/api/scramble', scrambleRoutes);
app.use('/api/public', globalRoutes);

// Set strictQuery before connecting to the database
mongoose.set('strictQuery', true); // or false, based on your preference

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1); // Optional: exit process for severe errors
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  // Optional: perform specific cleanup or logging
});
