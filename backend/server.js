


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


// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const path = require('path');
// const userRoutes = require('./routes/user');
// const mathRoutes = require('./routes/math');
// const scrambleRoutes = require('./routes/scramble');
// const globalRoutes = require('./routes/global');

// const app = express();


// app.use(express.json());

// const corsOptions = {
//   origin: process.env.FRONTEND_URL || '*', 
// };
// app.use(cors(corsOptions));


// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.use((req, res, next) => {
//   console.log(`${req.method} request for '${req.url}'`);
//   next();
// });

// app.use('/api/user', userRoutes);
// app.use('/api/math', mathRoutes);
// app.use('/api/scramble', scrambleRoutes);
// app.use('/api/public', globalRoutes);


// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to DB');
  
//     const PORT = process.env.PORT || 4001;
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Database connection failed:', error);
//   });

// process.on('uncaughtException', (error) => {
//   console.error('Uncaught Exception:', error);
//   process.exit(1);
// });

// process.on('unhandledRejection', (error) => {
//   console.error('Unhandled Rejection:', error);
// });
