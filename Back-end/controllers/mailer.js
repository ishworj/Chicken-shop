const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'karkiishwor10@gmail.com',
    pass: 'etkm ffpo jsae mtlt' // Ensure you're using an app-specific password for Gmail if you have 2-step verification enabled
  }
});
 
async function fetchEmailsFromAPI() {
    try {
      // Fetch the email list from the internal backend API
      const response = await fetch('http://localhost:8080/api/suscribers');
      
      // Ensure the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error('Failed to fetch emails from the API');
      }
  
      // Parse the response body as JSON
      const data = await response.json();
      
      // Return an array of emails
      return data.map(subscriber => subscriber.email);
    } catch (error) {
      console.error('Error fetching emails from API:', error);
      return []; // Return an empty array if there's an error
    }
  }
  
  // Function to send the email
  async function sendEmails() {
    try {
      const emails = await fetchEmailsFromAPI();
  
      if (emails.length === 0) {
        console.log('No emails to send.');
        return;
      }
  
      // Send email to the list of recipients
      const info = await transporter.sendMail({
        from: '"Chicken George" <karkiishwor10@gmail.com>',
        to: emails.join(','), // Join emails array into a comma-separated string
        subject: 'Happy Christmas',
        text: 'Hello, today\'s special is Happy Christmas! For our customers, today\'s specials are...'
      });
  
      console.log('Message sent:', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  
  // Execute the sendEmails function
  sendEmails();
