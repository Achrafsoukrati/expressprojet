const express = require("express");
const app = express();
const path = require("path");

// Middleware to check working hours
const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 18) {
        next();
    } else {
        res.send("<h1> Our App is only available from Monday to Friday, 9 AM to 5 PM </h1>");
    }
};

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.use(checkWorkingHours);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
