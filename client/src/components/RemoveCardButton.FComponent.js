import React from 'react';

//passed deck state and a card ID, performs a filter, then sets the deck state after getting a filtered list that removes the card ID.

export default (props) => {

    const {card, deck, updateDeck} = props;

    const clickHandler = (e) => {
        console.log(deck);
        console.log(card);
        const filteredDeck = {}
        for(let key in deck){
            if(key!=card){
                filteredDeck[key] = deck[key];
            }
        }
        console.log(filteredDeck);
        updateDeck(filteredDeck);
    }


    return(
        <button onClick={clickHandler}>Remove</button>
    )

}