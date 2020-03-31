import React, {useState} from 'react';
import axios from 'axios';
import DeckStyle from '../styles/DeckStyle.module.css';

//fetches the list of decks stored on the database based on the parameters passed (user ID or if none, most recent five or so).

export default (props) => {

    const {user, deckList, changeDeck, setDeckID, changeDeckName, setMethod, refreshDeckList} = props;
    //const [deckList, setDeckList] = useState([]);
    const [identifier, setIdentifier] = useState("Your");


    // useEffect(() => {
    //     //Axios call currently retrieves all the decks in the database.
    //     axios.get("http://localhost:8000/api/mtg/builder")
    //         .then((response) => {
    //             console.log("Deck List call response:", response);
    //             setDeckList(response.data.decks);
    //         })
    //         .catch((err) => console.log(err));

    // },[])

    const changeActiveDeck = (e, deck, keyword) => {
        // console.log(deck);
        changeDeck(deck.cardlist);
        setDeckID(deck._id);
        changeDeckName(deck.name);
        setMethod(keyword);
    }

    const toggleView = (e, view, override) =>{
        setIdentifier(view);
        refreshDeckList(override);
    }

    return (
        <div className={DeckStyle.deckListContainer}>
            {user=="none" ?
                <p className={DeckStyle.deckT2}>Deck List:</p>
            :
                <p className={DeckStyle.deckT2}>{identifier} Decks:
                <span className={DeckStyle.deckT3} onClick={(e)=>toggleView(e,"All",true)}>View All</span>
                <span className={DeckStyle.deckT3} onClick={(e)=>toggleView(e,"Your",false)}>View Yours</span>
                </p>
            }
            <ul className={DeckStyle.deckList}>
            {deckList.map((deck, index) => {
                if(deck.owner == user.sub){
                    return (
                        <li key={index}>{deck.name} <span className={DeckStyle.deckT3} onClick={(e) => changeActiveDeck(e, deck, "Edit")}>Edit Deck</span></li>
                    )
                } else {
                    return (
                        <li key={index}>{deck.name} <span className={DeckStyle.deckT3} onClick={(e) => changeActiveDeck(e, deck, "View")}>View Deck</span></li>
                    )
                }
            })}
            </ul>
        </div>
    )
}