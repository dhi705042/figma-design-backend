const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./src/controller/routes/userRoutes');
const userRoutes = require("./src/routes/userRoutes")
const authMiddleware = require('./src/middleware/authMiddleware');


const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// apply Global Middleware
app.use(authMiddleware);

mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
