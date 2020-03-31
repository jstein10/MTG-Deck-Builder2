// DO NOT USE THIS FILE. This was before finalized schemas were set and cards were still being considered as a separate schema.

// const mongoose = require('mongoose');

// const CardSchema = new mongoose.Schema({
//     scryfall_id: {type: String},
//     name: {type: String}, //gameplay
//     type_line: {type: String}, //gameplay
//     img: {type: String}, //print
//     mana_cost: {type: String}, //gameplay
//     cmc: {type: mongoose.Schema.Types.Decimal128}, //gameplay
//     power: {type: String}, //gameplay
//     toughness: {type: String}, //gameplay
//     colors: {type: Array}, //gameplay
//     color_identity: {type: String}, //gameplay
//     rarity: {type: String}, //print
//     price: {type: mongoose.Schema.Types.Decimal128}, //print
// }, {timestamps: true});


// module.exports.Card = mongoose.model("Card", CardSchema);