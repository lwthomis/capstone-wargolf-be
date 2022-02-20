const Tournament = require("../models/Tournaments");

exports.findTournaments = async (req, res) => {
  const tournaments = await Tournament.find();
  res.send({ data: tournaments });
};

exports.createTournament = async (req, res) => {
  const tournament = new Tournament(req.body);
  await tournament.save();
  res.send({ data: tournament }); 
};

exports.findTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    res.send({ data: tournament });
  } catch {
    res.status(404).send({ error: "Tournament is not found!" });
  }
};

exports.updateTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    Object.assign(tournament, req.body);
    tournament.save();
    res.send({ data: tournament });
  } catch {
    res.status(404).send({ error: "Tournament is not found!" });
  }
};

exports.deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    await tournament.remove();
    res.send({ data: true });
  } catch {
    res.status(404).send({ error: "Tournament is not found!" });
  }
};
