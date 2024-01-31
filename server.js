const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require("./src/routes/userRoutes")
const authMiddleware = require('./src/middleware/authMiddleware');


const app = express();
const PORT = 3001;

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://dhiraj579:dhiraj579@cluster0.grf2f7z.mongodb.net/UserCollection", { useNewUrlParser: true })
    .then(() => console.log('mongodb running perfectly on 27017'))
    .catch(err => console.log(err))

// apply Global Middleware
app.use(authMiddleware);

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
