const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();


const cors = require("cors");
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: false,
  optionSuccessStatus: 200
};
const bodyParser = require('body-parser')
const tournamentController = require("./controllers/tournaments");
const userController = require("./controllers/users");


mongoose
  .connect(`mongodb+srv://${process.env.SECRET_KEY}@cluster0.lrlyi.mongodb.net/wargolf?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(express.static("public"));
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


    app.get("/tournaments", cors(), tournamentController.findTournaments);
    app.post("/tournaments", cors(), tournamentController.createTournament);
    app.get("/tournaments/:id", cors(), tournamentController.findTournament);
    app.patch("/tournaments/:id", cors(), tournamentController.updateTournament);
    app.delete("/tournaments/:id", cors(), tournamentController.deleteTournament);

    app.get("/users", cors(), userController.findUsers); 
    app.post("/users", cors(), userController.createUser);
    app.get("/users/:email", cors(), userController.findUser);
    app.patch("/users/:id", cors(), userController.updateUser);
    app.delete("/users/:email", cors(), userController.deleteUser);
    app.post("/login", cors(), userController.signInUser);


    app.listen(3001, () => {
      console.log("Server has started at port 3001");
    });
  })
  .catch(() => {
    console.log("Database connection failed!");
  });
