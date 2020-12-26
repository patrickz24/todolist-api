require('dotenv').config({ path: __dirname + '/.env' });
const nodemailer = require("nodemailer");

module.exports= {
   transporter : nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kaval.prod@gmail.com',
        pass: 'P@ssw2rfz'
    }
}),

 
  
 info :{
  from: "kaval.prod@gmail.com", 
  to: "patrickzamblebi37@gmail.com", 
subject:"",
text:''
  },

}