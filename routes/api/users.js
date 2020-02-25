
const express = require("express")
const router = express.Router();
const nodemailer = require("nodemailer");

const User = require("../../model/user")

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'emmanuelsumeh@gmail.com',
      pass: 'Loaded888'
    }
  });


  

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
    // if(req.method !== "local" ){
    //   next()
    // }
  
    const {email} = req.body;
    console.log(email)
  
    // Simple validation
    if (!email) {
      return res.status(400).json({ msg: "Please enter your email" });
    }
  
    // Check for existing user
    User.findOne({ "user.email" : email }).then(user => {
        console.log("line 37", user)
  
      if (user) return res.status(400).json({ msg: "User already exists" });
  
      const newUser = new User({
       
        user :{
          email
          
        }

       
     


        
      });
      var mailOptions = {
        from: 'emmanuelsumeh@gmail.com',
        to:    `${newUser.user.email}`,
        subject: 'Thank You For Signing Up',
        text: 'You have successfully signed up with elesar'
      };

      console.log("new user ", newUser.user.email)

newUser.save().then(
    user => {
       
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
)
// .then(
//     res => {
//         res.status(200).json({msg : "registered successfully"})
//     }
// )
     
    });
  });

  // @route   GET api/users
// @desc    list all user
// @access  Public

router.get("/", (req, res) => {
    User.find()
      // .sort({date : -1})
      .then(users => res.json(users));
  });
  
module.exports = router;