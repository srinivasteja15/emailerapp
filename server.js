const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.get('/',function(req,res){
res.send({
message:'Default route in email tutorial project'
})
});
const myOAuth2Client = new OAuth2(
"994293384858-n7h0cgl8rjgtuk8si7b1kno1kj9k66hl.apps.googleusercontent.com",//client id
"npUzAaP6v43AT71aubvAqjCH",//client secret
"https://developers.google.com/oauthplayground"
)
myOAuth2Client.setCredentials({
refresh_token:"1//0fl1JqK1nYOEoCgYIARAAGA8SNwF-L9Irl-QmZ-upFKEwuhPW5wyIex-Imgqb9j8pV8qnE0Z1Pt2jL0tUWqdJH4BCu8OFfK4KlME"
});
const myAccessToken = myOAuth2Client.getAccessToken()
const transport = nodemailer.createTransport({
     service: "gmail",
     auth: {
          type: "OAuth2",
          user: "vt.srinivasteja@gmail.com", //your gmail account you used to set the project up in google cloud console"
          clientId: "994293384858-n7h0cgl8rjgtuk8si7b1kno1kj9k66hl.apps.googleusercontent.com",
          clientSecret: "npUzAaP6v43AT71aubvAqjCH",
          refreshToken: "1//0fl1JqK1nYOEoCgYIARAAGA8SNwF-L9Irl-QmZ-upFKEwuhPW5wyIex-Imgqb9j8pV8qnE0Z1Pt2jL0tUWqdJH4BCu8OFfK4KlME",
          accessToken: myAccessToken //access token variable we defined earlier
     }});


app.post('/sendemail',function(req,res){
const mailOptions = {
from: 'vt.srinivasteja@gmail.com', // sender
to: 'srinivastejavemuruthiru@gmail.com', // receiver
subject: 'Mail from SrinivasTeja', // Subject
html: '<p>You have received this email using srinivasteja api :)</p>'// html body
}
transport.sendMail(mailOptions,function(err,result){
if(err){
res.send({
message:err
})
}else{
transport.close();
res.send({
message:'Email has been sent: check your inbox!'
})
}
})
})
app.listen(PORT, function (req, res) {
console.log(`Listening on port ${PORT}`);
})
