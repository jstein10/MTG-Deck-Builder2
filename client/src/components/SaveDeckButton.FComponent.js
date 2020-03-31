import React from 'react';
import axios from 'axios';
import { useAuth0 } from '../react-auth0-spa';

export default (props) => {

    const {deckName, deck, method, deckID, refreshDecks} = props;

    const { loading, user } = useAuth0();

    const saveDeck = () => {
        console.log("Lets save a deck! Here's the stuff.")
        console.log("Deck ID:", deckID);
        console.log("Deck Name:", deckName);
        console.log("Deck Contents:", deck);
        console.log("Update Method:", method)
        if (!loading){
            if(method=="Create"){
                axios.post('http://localhost:8000/api/mtg/builder', {owner: user.sub, name: deckName, cardlist: deck})
                .then((response) => {
                    console.log("We got a response!")
                    console.log(response);
                    refreshDecks(false);
                })
                .catch((err) =>  console.log(err));
            } else if (method=="Edit") {
                axios.put(`http://localhost:8000/api/mtg/builder/${deckID}/edit`, {owner: user.sub, name: deckName, cardlist: deck})
                .then((response) => {
                    console.log("We got a response!")
                    console.log(response);
                    refreshDecks(false);
                })
                .catch((err) =>  console.log(err));
            } else {
                console.log("Unexpected method!");
            }
        }
    }


    return(
        <button onClick={saveDeck}>Save Deck</button>
    )
}