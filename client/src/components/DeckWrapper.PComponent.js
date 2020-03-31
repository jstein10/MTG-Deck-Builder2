import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DeckList from './DeckList.FComponent';
import DeckDetails from './DeckDetails.FComponent';
import DeckContents from './DeckContents.PComponent';
import DeckStats from './DeckStats.PComponent';

export default (props) => {

    const {user, deckState, setDeckState} = props;
    const [deckList, setDeckList] = useState([]);
    const [deckName, setDeckName] = useState("");
    const [deckID, setDeckID] = useState("");
    const [method, setMethod] = useState("Create");

    
    useEffect(() => {
        if(user=="none"){
            //Retrieves all the decks in the database.
            axios.get("http://localhost:8000/api/mtg/builder")
            .then((response) => {
                console.log("Deck List call response:", response);
                setDeckList(response.data.decks);
            })
            .catch((err) => console.log(err));
        } else {
            console.log(user);
            setDeckName("New Deck");
            //Retrieves the user's decks.
            axios.get(`http://localhost:8000/api/mtg/user/decks/${user.sub}`)
            .then((response) => {
                console.log("Deck List call response:", response);
                setDeckList(response.data);
            })
            .catch((err) => console.log(err));
        }
    },[])
    
    
    const refreshDeckList = (override) =>{
        // console.log(override);
        if(user=="none" || override){
            //Retrieves all the decks in the database.
            axios.get("http://localhost:8000/api/mtg/builder")
            .then((response) => {
                console.log("Deck List call response:", response);
                setDeckList(response.data.decks);
            })
            .catch((err) => console.log(err));
        } else {
            //Retrieves the user's decks.
            axios.get(`http://localhost:8000/api/mtg/user/decks/${user.sub}`)
            .then((response) => {
                console.log("Deck List call response:", response);
                setDeckList(response.data);
            })
            .catch((err) => console.log(err));
        }
        setDeckState([]);
        setDeckName("New Deck");
        setDeckID("");
        setMethod("Create");
    }
    

    return (
        <>
            <div>
                <DeckList user={user} deckList={deckList} changeDeck={setDeckState} setDeckID={setDeckID} changeDeckName={setDeckName} setMethod={setMethod} refreshDeckList={refreshDeckList}/>
                <DeckDetails openModal={props.openNewModal} user={user} deckName={deckName} setDeckName={setDeckName} deckID={deckID} deck={deckState} method={method} refresh={refreshDeckList}/>
            </div>
            <div>
                <DeckContents deck={deckState} updateDeck={setDeckState}/>
            </div>
        </>
    )
}