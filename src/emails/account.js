// This module is not working . 
// I will fix it later
const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sgMail.send({
    to:'abhishek.abskch@gmail.com',
    from:'abhishek.abskch@gmail.com',
    subject:'this is my first creation',
    text:'I hope this is to you'
}).then(() => {
    console.log('email sent');
}).catch(() => {
    console.log("not worked")
})