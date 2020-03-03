
const express = require("express");

const cors = require("cors");

// const config = require('config') 
const path = require("path");
// const mailer = require('./misc/mailer')

const mongoose = require("mongoose");
require('dotenv').config();

const app = express();


// const chatkit = new Chatkit.default({
//   instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
//   key: process.env.CHATKIT_SECRET_KEY,
// });

app.use(
  cors({
    // origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true
  })
);

app.use(express.json());

// mongoose uri

const db =  process.env.DB_CONN;

// Connect to mongoose
console.log(db)

mongoose
  .connect(db, 
    {
      useNewUrlParser : true,
      useCreateIndex : true,
      useUnifiedTopology: true 

    })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use('/api/users', require('./routes/api/users'))







// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.set("port", process.env.PORT || 5200);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});