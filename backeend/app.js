// // connect with express
// const express = require('express');
// // connect with morgan
// const morgan = require('morgan');
// // connect with mongoose
// const mongoose = require('mongoose');
// // connect with ticket model
// const Ticket = require('./models/ticket');
// // create an express app
// const app = express();

// // Middleware to parse JSON bodies
// app.use(express.json());

// //connect with mongodb atlas
// const dbURI = 'mongodb+srv://redet:1234@cluster0.uaefq.mongodb.net/role_based_ticket_management?retryWrites=true&w=majority&appName=Cluster0';
// // connect with mongoose
// mongoose.connect(dbURI)
//   .then((result) => app.listen(3000))
//   .catch((err) => console.log(err));
// //register view engine
// app.set('view engine', 'ejs');

// // Middleware & Static files
// app.use(express.static('public')); // Serve static files
// app.use(morgan('dev')); // Logs requests to the console

// //mongoose and mongo sandbox routes
// app.get('/add-ticket', (req, res) => {
//   const ticket = new Ticket({
//     title: 'New Ticket2',
//     description: 'Ticket description',
//     status: 'Open',
//     priority: 'Low',
//     assignedTo: 'User',
//     createdBy: 'Admin'
//   });

//   ticket.save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// //get all tickets
// app.get('/all-tickets', (req, res) => {
//   Ticket.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// //get single ticket
// app.get('/single-ticket', (req, res) => {
//   Ticket.findById(req.query.id)
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// //routes
// app.get('/', (req, res) => {
//   res.redirect('/tickets');
// });

// app.get('/about', (req, res) => {
//   res.render('about', { title: 'About' });
// });

// //ticket routes
// app.get('/tickets', (req, res) => {
//   Ticket.find()
//     .then((result) => {
//       res.render('index', { title: 'All Tickets', tickets: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get('/tickets/create', (req, res) => {
//   res.render('create', { title: 'Create a new ticket' });
// });

// // Create a new ticket
// app.post('/tickets', (req, res) => {
//   const ticket = new Ticket(req.body);
//   ticket.save()
//     .then((result) => {
//       res.redirect('/tickets');
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// // Get a single ticket by ID
// app.get('/tickets/:id', (req, res) => {
//   Ticket.findById(req.params.id)
//     .then((result) => {
//       res.render('ticket', { title: 'Ticket Details', ticket: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// // Update a ticket by ID
// app.put('/tickets/:id', (req, res) => {
//   Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// // Delete a ticket by ID
// app.delete('/tickets/:id', (req, res) => {
//   Ticket.findByIdAndDelete(req.params.id)
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

require('dotenv').config();
const auth = require('./middleware/auth');
const express = require('express');
const morgan = require('morgan');// if I use it somewhere
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ticketRoutes = require('./routes/ticketRoutes'); // Import routes
const authRoutes = require('./routes/authRoutes'); // Import auth routes

const app = express();

// Middleware
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.use('/', authRoutes);
app.use('/tickets', ticketRoutes);
// Static files
app.use(express.static('public'));
app.use(morgan('dev'));


// Connect to MongoDB

//const dbURI = `mongodb+srv://user2000:test234@cluster0.uaefq.mongodb.net/`;


const dbURI ='mongodb+srv://redet:1234@cluster0.uaefq.mongodb.net/role_based_ticket_management?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log('DB Connection Error:', err));



// Use ticket routes
app.use('/', ticketRoutes);

// Default route
app.get('/', (req, res) => {
  res.send("Welcome to the Ticket API!" );
});



