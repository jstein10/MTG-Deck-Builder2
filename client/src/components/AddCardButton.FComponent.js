import React from 'react';

//adds a card to the current deck state (for add functionality, currently, see the card list component.)
//will need to be passed state, an ID, and updateState functionality.

export default (props) => {

    const {card, deck, updateDeck} = props;

    const clickHandler = (e) => {
        let imgSmall;
        let imgNormal;
        // add to deck
        // console.log("Checking add duplicates.");
        // console.log("My Card:", card);
        // console.log("My Deck:", deck);
        // console.log("Is this card already in there?", deck.hasOwnProperty(card.id));
        if(!deck.hasOwnProperty(card.id)){
            console.log("GARY'S SHIT:",card)
            if('card_faces' in card){
                if('image_uris' in card.card_faces[0]){
                    imgSmall = card.card_faces[0].image_uris.small;
                    imgNormal = card.card_faces[0].image_uris.normal;
                }
                else{
                    imgSmall = card.image_uris.small;
                    imgNormal = card.image_uris.normal;
                }
            }
            else{
                imgSmall = card.image_uris.small;
                imgNormal = card.image_uris.normal;
            }
            updateDeck({
                ...deck,
                [card.id]: {
                    scryfall_id: card.id,
                    name: card.name,
                    type_line: card.type_line,
                    img: imgSmall,
                    img_normal: imgNormal,
                    mana_cost: card.mana_cost,
                    cmc: card.cmc,
                    power: card.power,
                    toughness: card.toughness,
                    colors: card.colors,
                    color_identity: card.color_identity,
                    rarity: card.rarity,
                    price: card.prices.usd,
                    count_in_deck: 1}
            });
        } else {
            console.log("This card already exists in the deck. If you want to add duplicates, use the counter feature in the deck contents section.")
        }
    }

    return (
        <button onClick={clickHandler}>Add</button>
    )


}