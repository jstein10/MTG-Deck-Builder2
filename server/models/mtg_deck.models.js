const mongoose = require('mongoose');


const DeckSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: [true, "An owner ID parameter is required."]
    },
    name: {
        type: String,
        required: [true, "Please name your deck. It'll make it easier for you to find later!"]
    },
    cardlist: {
        type: Object
    } 
    /* 
    example: 
    cardlist: {
        {scryfall id goes here} :{
            scryfall_id: {type: String},
            name: {type: String}, //gameplay
            type_line: {type: String}, //gameplay
            img: {type: String}, //print
            mana_cost: {type: String}, //gameplay
            cmc: {type: mongoose.Schema.Types.Decimal128}, //gameplay
            power: {type: String}, //gameplay
            toughness: {type: String}, //gameplay
            colors: {type: Array}, //gameplay
            color_identity: {type: String}, //gameplay
            rarity: {type: String}, //print
            price: {type: mongoose.Schema.Types.Decimal128}, //print
            card_count: {type: Number} //set by user
        }
    }
    // Possible issue point with this setup is "removing" a specific card type from the deck. We could keep the key-value pair
    // in and set the count to zero, but that leaves a lot of otherwise unused data. there may be a way to remove a key-value pair entirely.
    // It's possible that it could be completely re-built every time an edit is made (which might actually be the way to go...)
    */
}, {timestamps: true});

module.exports = mongoose.model("Deck", DeckSchema);