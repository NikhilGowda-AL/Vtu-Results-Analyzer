const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        credentials: true,
    })
);
mongoose.connect("mongodb+srv://Nikki:larXNwMvWZSAku9B@vtu-results.e1nruvy.mongodb.net/", { dbName: 'vtu-results' })
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("DB Connection Error: ", err));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

app.use('/', require('./router/index'));



app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
  });