const DeckBuilderController = require('../controllers/mtg.controllers');

module.exports = (app) => {
    app.get('/api', DeckBuilderController.index);
    app.get('/api/mtg/builder', DeckBuilderController.allDecks);
    app.post('/api/mtg/builder', DeckBuilderController.createDeck); //how to post with MAP objects in postman????
    app.get('/api/mtg/user/decks/:id', DeckBuilderController.getUserDesks);
    app.get('/api/mtg/builder/:id', DeckBuilderController.getDeck);
    app.put('/api/mtg/builder/:id/edit', DeckBuilderController.updateDeck);
    app.delete('/api/mtg/builder/delete/:id', DeckBuilderController.deleteDeck);
}