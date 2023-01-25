# PaymentReminder

*PLEASE NOTE THAT THIS WEBSITE WAS FOR EDUCATIONAL PURPOSES ONLY*

Website Link: https://burdspaymentreminder.netlify.app/

Hi! thanks for checking out my little project. PaymentReminder's is a website that allows you to keep track of your current subscriptions and will send you an email on the day your next subscription payment is due. This is currently a work in progress and just a fun little project that I built to keep my skills up to date with the following technologies!

* Firebase
  * Authentication with email and password done through Firebase
* React
* AWS
  * Lambda
    * configured in node.js. Two seperate lambda functions, one that writes to the dynamodb table, and the other that reads from it
  * DynamoDB
    * stores user data with the user email as a primary key and a list of all subscriptions tied to that user
  * API Gateway
    * Axios
      * gives access to the lambda functions to the React front-end side with an API url that can be called using axios.
* EmailJS
  * API used to send emails on behalf of the website, scheduled from the specificaitons given by the user. 

Deployed using netlify. 

If you'd like to find out a little more about me here is a link to my portfolio!

#### Portfolio Link ####

Happy Coding!

Steven
