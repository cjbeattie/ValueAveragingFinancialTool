const express = require('express')
const mongoose = require("mongoose");
// const userController = require('./controllers/user-controller')
// const listController = require("./controllers/list-controller");
// const categoryController = require("./controllers/category-controller");
// const sessionsController = require('./controllers/sessions-controller.js');
const valuePathController = require('./controllers/valuePathController');
const portfolioController = require('./controllers/portfolioController');
const userController = require('./controllers/userController')
const session = require("express-session");
// const path = require('path'); // setup the mongoose connection (app.js)

require("dotenv").config();

const app = express()

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// app.use() => using express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public")); // setup the static / public folder
app.use(
    session({
        secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
        resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
        saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
    })
)
// app.use('/api/users', userController)
// app.use("/api/list", listController);
// app.use("/api/category", categoryController);
// app.use('/api/sessions', sessionsController)
app.use("/api/valuePath", valuePathController);
app.use("/api/portfolio", portfolioController);
app.use("/api/user", userController);




if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build',
            'index.html'));
    });
}

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});