import React, {useState} from 'react';
import SaveDeckButton from './SaveDeckButton.FComponent';
import DeleteDeckButton from './DeleteDeckButton.FComponent';
import DeckStyle from '../styles/DeckStyle.module.css';
import DeckStats from '../components/DeckStats.PComponent';

export default (props) => {

    const {user, deckName, setDeckName, deckID, deck, method, refresh} = props
    let cardCount = 0;

    for(let card in deck){
        cardCount += parseInt(deck[card].count_in_deck);
    }

    const nameChangeHandler = (e) => {
        setDeckName(e.target.value);
    }

    return (
        <div className={DeckStyle.deckDetails}>
            {method=="View" || user=="none"?
            <>
                <p className={DeckStyle.deckT2}>Deck Name: {deckName}</p>
                <p className={DeckStyle.deckT2b}>Total Cards in Deck: {cardCount}</p>
                <DeckStats deck={deck} openModal={props.openNewModal}/>
            </>
        :
            <>
                <label className={DeckStyle.deckT2}>Deck Name: </label><input type="text" name="deckName" value={deckName} onChange={nameChangeHandler}/>
                <br/> <p className={DeckStyle.deckT2b}>Total Cards in Deck: {cardCount}</p>
                <SaveDeckButton deckName={deckName} deck={deck} method={method} deckID={deckID} refreshDecks={refresh}/> <DeckStats deck={deck}/> {method=="Edit"? <DeleteDeckButton deckID={deckID} refreshDecks={refresh}/> : <></> }
            </>
        }
            

        </div>

    )
}