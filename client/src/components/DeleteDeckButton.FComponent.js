import React from 'react';
import axios from 'axios';


//This button deletes an entire deck from the database.

export default (props) => {
    const {deckID, refreshDecks} = props;

    const clickHandler = (e) => {
        axios.delete(`http://localhost:8000/api/mtg/builder/delete/${deckID}`)
            .then((response) => {
                console.log(response);
                refreshDecks();
            })
            .catch((err) => console.log(err));
    }

    return (
        <button onClick={clickHandler}>Delete Deck</button>
    )
}