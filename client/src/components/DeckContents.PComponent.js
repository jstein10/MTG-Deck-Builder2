import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DetailsButton from './CardDetailsButton.FComponent';
import RemoveButton from './RemoveCardButton.FComponent';
import CardStyle from '../styles/CardStyle.module.css';
import DeckStyle from '../styles/DeckStyle.module.css';


export default (props) => {
    //Props should contain an ID of the deck that is being edited, or in cases where
    //a new deck is being created, an empty string (or some other data to signal a
    //new deck is being created).
    const {deck, updateDeck} = props;

    
    

    const updateCount = (e, card) => {
        // console.log("Count change!", e.target.value);
        let new_count = e.target.value
        // console.log("Card!", card);
        updateDeck({
            ...deck,
            [card.scryfall_id]: {
                scryfall_id: card.scryfall_id,
                name: card.name,
                type_line: card.type_line,
                img: card.img,
                mana_cost: card.mana_cost,
                cmc: card.cmc,
                power: card.power,
                toughness: card.toughness,
                colors: card.colors,
                color_identity: card.color_identity,
                rarity: card.rarity,
                price: card.price,
                count_in_deck: new_count}

        })

    }
//value={deck[card].count_in_deck}

    return (
        <div className={DeckStyle.deckContents}>
                {Object.keys(deck).map((card, index) =>{
                    return (
                    <div className={CardStyle.cardListItem} key={index}>
                        <img src={deck[card].img} alt={deck[card].name}/>
                        <p className={CardStyle.cardText}>{deck[card].name}</p>
                        <label className={CardStyle.cardText}>Count: </label><input type="number" value={deck[card].count_in_deck} min={1} onChange={(e)=>updateCount(e, deck[card])}/>
                        <DetailsButton img_normal={deck[card].img_normal} card={card}/> <RemoveButton card={card} deck={deck} updateDeck={updateDeck}/>
                    </div>
                    )
                })}
        </div>
    )
}