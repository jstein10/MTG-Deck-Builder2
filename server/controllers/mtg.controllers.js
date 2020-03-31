const Deck = require('../models/mtg_deck.models');

module.exports = {
    // index route
    index: (request, response) => {
        response.json({
        message: "Hello, this is route index of MTG Deck Builder..."
            });
    },
    // Create
    createDeck: (request, response) => {
        console.log("create is fired!");
        console.log(request.body)
        console.log("Can we get stuff from the cardlist?")
        console.log(request.body.cardlist);
        Deck.create(request.body)
            .then(deck => {
                response.status(201).json(deck);
            })
            .catch(err => response.status(400).json(err));
    },
    // Read: find one Deck base on ID
    getDeck:(request, response) => {
        console.log('Search based on ID is fired!');
        Deck.findOne({_id:request.params.id})
            .then(deck=>response.status(200).json(deck))
            .catch(err => response.status(404).json(err));
    },
    getUserDesks:(request, response) =>{
        console.log('getting user decks is triggered...')
        Deck.find({owner:request.params.id})
            .then(deck=>response.status(200).json(deck))
            .catch(err => response.status(404).json(err));
    },
    // Read: find all Deck in database
    allDecks: (request, response) => {
        // console.log("Find all data is fired!")
        Deck.find()
            .then(decks => response.status(200).json({decks: decks}))
            .catch(err => response.status(404).json(err));
    },
    // Update: update the target Deck
    updateDeck: (request, response) => {
        console.log("Update is fired!!");
        Deck.updateOne({_id:request.params.id}, request.body, {runValidators: true})
            .then(deck => {
                response.status(202).json(deck)
                console.log('update successful')})
            .catch(err => response.status(304).json(err));
    },
    // Delete: delete target Deck
    deleteDeck: (request, response) => {
        console.log("Delete is fired!");
        Deck.deleteOne({_id:request.params.id})
            .then(deleteConfirmation => response.status(200).json(deleteConfirmation))
            .catch(err => response.status(400).json(err));
    }
}