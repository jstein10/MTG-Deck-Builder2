import React, { useEffect, Fragment, useState } from 'react'
import FilterCardList from '../components/CardList.PComponent'
import CardFilterFComponent from '../components/CardFilter.FComponent';
import DeckWrapper from '../components/DeckWrapper.PComponent';
import { useAuth0 } from '../react-auth0-spa'

import CardStyle from '../styles/CardStyle.module.css';

import axios from 'axios';


export default function Main() {
    const { loading, user } = useAuth0();

    // Sets State for the deck map (which is an ordered key-value array object)and defines a custom
    // update function, as setting state normally will not trigger a refresh
    const [deckState, setDeckState] = useState({});
    // const updateDeck = (key,value) => {
    //     setDeckMap(new Map(deckMap.set(key,value)));
    // }

    // scryfall axios url being edited in cardfilter.fcomponent and passed to cardlist.pcomponent
    const [filterUrl,setFilterUrl] = useState('https://api.scryfall.com/cards/search?order=color&unique=prints&q=e%3Aaer');
    const [requestType, setRequestType] = useState('get');

    const [orderBy, setOrderBy] = useState('color');

    return (
        <>
        {!user ? 
            <div>
                <p>not signed in</p>
                <div className={CardStyle.cardFilterContainer}>
                    <CardFilterFComponent filterUrl={filterUrl} setFilterUrl={setFilterUrl} orderBy={orderBy} setOrderBy={setOrderBy} requestType={requestType} setRequestType={setRequestType}/>
                </div>
                <div className={CardStyle.cardList}>
                    <FilterCardList filterUrl={filterUrl} setFilterUrl={setFilterUrl} orderBy={orderBy} setOrderBy={setOrderBy} requestType={requestType} setRequestType={setRequestType} deck={deckState} updateDeck={setDeckState}/>
                </div>
                <DeckWrapper user={"none"} deckState={deckState} setDeckState={setDeckState}/>
            </div> 
            : <Fragment>
                <div className={CardStyle.cardFilterContainer}>
                    <CardFilterFComponent filterUrl={filterUrl} setFilterUrl={setFilterUrl} orderBy={orderBy} setOrderBy={setOrderBy} requestType={requestType} setRequestType={setRequestType}/>
                </div>
                <div className={CardStyle.cardList}>
                    <FilterCardList filterUrl={filterUrl} setFilterUrl={setFilterUrl} orderBy={orderBy} setOrderBy={setOrderBy} requestType={requestType} setRequestType={setRequestType} deck={deckState} updateDeck={setDeckState}/>
                </div>
                <DeckWrapper user={user} deckState={deckState} setDeckState={setDeckState}/>
            </Fragment>}
        </>
    )
}