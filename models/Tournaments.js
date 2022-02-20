const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  tournament: { type: String, required: true },
  course: { type: String, required:true },
  city: { type: String, required:true },
  state: { type: String, required:true },
  golfweek: { type: Boolean },
  ajga: { type: Boolean },
  jgs: { type: Boolean },
  kyjrpga: { type: Boolean },
  southern: { type: Boolean },
  pga: { type: Boolean },
  start: { type: Date, required:true },
  finish: { type: Date, required:true },
  url: { type: String },
});

module.exports = mongoose.model("Tournaments", tournamentSchema);
