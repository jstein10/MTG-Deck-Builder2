import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import {Link, navigate} from '@reach/router';
import AddButton from './AddCardButton.FComponent';
import DetailsButton from './CardDetailsButton.FComponent';
import styles from '../styles/CardStyle.module.css'

export default (props) => {
    const {deck, updateDeck} = props;
    const [cardList, setCardList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [cardsFound, setCardsFound] = useState(true);

    useEffect(() => {
        if(props.requestType == 'post'){
            let testArr = {
                "identifiers": []
            };
            let tempCardList = [];
            // console.log("POST URL:",props.filterUrl)
            axios.get(`${props.filterUrl}`)
                .then(res => {
                    // console.log("FIRST LEG PASSED!")
                    // console.log("searchByName DATA:",res.data.data.length)
                    for(let i = 0; i < res.data.data.length; i++){testArr['identifiers'].push({"name":res.data.data[i]});}
                    // console.log("TEST ARR:", testArr)
                    axios.post('https://api.scryfall.com/cards/collection', testArr)
                        .then(res => {
                            // console.log("POST RES:", res);
                            setCardsFound(true);
                            tempCardList = res.data.data;
                            sorter(tempCardList);
                            setCardList(tempCardList);
                            setLoaded(true);
                        })
                        .catch(err => {
                            // alert("No matches have been found with that filter. Please adjust the search.")
                            setCardsFound(false);
                        })
                    })
        }
        else if(props.requestType == 'get'){
            // console.log("*****")
            // console.log("*****")
            // console.log("*****")
            // console.log("*****")
            // console.log("*****")
            // console.log("*****")
            let page = 1;
            let lastPage;
            let tempCardList = [];
            let promises = [];
            console.log("LINK:",props.filterUrl+`&page=${page}`);
            // Initial axios call. Returns 175 cards out of the list per page
            axios.get(`${props.filterUrl}&page=${page}`)
            // axios.get(`https://api.scryfall.com/cards/search?order=color&unique=prints&q=${props.filter.sets}&page=${page}`)
                .then(res => {
                    // console.log("I FOUND CARDS")
                    setCardsFound(true);
                    tempCardList = res.data.data;
                    // If there are more than 175 cards, there is more than 1 page. Find the last page and loop axios calls
                    if(res.data.total_cards > 175){
                        page++;
                        lastPage = Math.ceil((res.data.total_cards - 175)/175) + page;
                        for(page; page < lastPage; page++){
                            promises.push(
                                // axios.get(`https://api.scryfall.com/cards/search?order=color&q=e%3A${props.filter.sets}&unique=prints&page=${page}`)
                                axios.get(`${props.filterUrl}&page=${page}`)
                                // axios.get(`https://api.scryfall.com/cards/search?order=color&unique=prints&q=${props.filter.sets}&page=${page}`)
                                    .then(res => {
                                        res.data.data.forEach(card => {
                                            tempCardList.push(card);
                                        })
                                    })
                            )
                        }
                        // Everything in Promise.all will happen after all other promises have finished
                        Promise.all(promises).then(() => {
                            // console.log("TEMP:",page,tempCardList);
                            // Sort the full card list before displaying it
                            sorter(tempCardList);
                            setCardList(tempCardList);
                            setLoaded(true);
                        })
                    }
                    else{
                        // console.log("STILL FOUND CARDS...")
                        // console.log(tempCardList);
                        sorter(tempCardList);
                        setCardList(tempCardList);
                        setLoaded(true);
                    }
                })
                .catch(err => {
                    // alert("No matches have been found with that filter. Please adjust the search.")
                    console.log("ERROR:",err)
                    setCardsFound(false);
                })
        }
    }, [props.filterUrl])
    const clickHandler = (e, card) => {
        // add to deck
        console.log(card.prices.usd);
        // updateDeck({
        //     ...deck,
        //     [card.id]: {
        //         name: card.name,
        //         type_line: card.type_line,
        //         img: card.image_uris.small,
        //         mana_cost: card.mana_cost,
        //         cmc: card.cmc,
        //         power: card.power,
        //         toughness: card.toughness,
        //         colors: card.colors,
        //         color_identity: card.color_identity,
        //         rarity: card.rarity,
        //         price: card.prices.usd,
        //         count_in_deck: 1}
        // });
    }
    // Sort the full list of cards based on the props.orderBy
    const sorter = (tempCardList) => {
        tempCardList.sort(function (a, b){
            if(props.orderBy == 'color'){
                if('colors' in a && 'colors' in b){
                // console.log("***************************")
                // console.log(a);
                // console.log(b);
                return a.colors.length - b.colors.length
                }
                else if('colors' in a){
                    return a.colors.length - b.card_faces[0].colors.length
                }
                else if('colors' in b){
                    return a.card_faces[0].colors.length - b.colors.length
                }
                else{
                    return a.card_faces[0].colors.length - b.card_faces[0].colors.length
                }
            }
            // Sort from highest -> lowest power. Anything without a power is at the end
            else if(props.orderBy == 'power'){
                if('power' in a && 'power' in b){
                    return(a.power > b.power ? -1 : a.power < b.power ? 1 : 0)
                }
                else if('power' in a){return -1;}
                else if('power' in b){return 1;}
                else{return 0}
            }
            // Sort from highest -> lowest toughness. Anything without a toughness is at the end
            else if(props.orderBy == 'toughness'){
                if('toughness' in a && 'toughness' in b){
                    return(a.toughness > b.toughness ? -1 : a.toughness < b.toughness ? 1 : 0)
                }
                else if('toughness' in a){return -1;}
                else if('toughness' in b){return 1;}
                else{return 0}
            }
            // Sort from highest -> lowest cmc
            else if(props.orderBy == 'cmc'){
                return(a.cmc > b.cmc ? -1 : a.cmc < b.cmc ? 1 : 0)
            }
            // Sort alphabetically
            else if(props.orderBy == 'name'){
                return(a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
            }
            // Sort rarest(mythic) -> common
            else if(props.orderBy == 'rarity'){
                if(a.rarity == 'mythic'){return -1}
                else if(b.rarity == 'mythic'){return 1}
                else if(a.rarity == 'rare'){return -1}
                else if(b.rarity == 'rare'){return 1}
                else if(a.rarity == 'uncommon'){return -1}
                else if(b.rarity == 'uncommon'){return 1}
                else{return 0}
            }
        });
    }
    return(
        <>
            {loaded &&
                <>
                {cardsFound ?
                    <div>
                        {cardList.map((card, index) => {
                            return(
                                <div className={styles.cardListItem} key={index}>
                                {/* Necessary for cards with multiple faces */}
                                {/* Are there multiple faces? */}
                                {'card_faces' in card?
                                    // Do the card_faces have images?
                                    'image_uris' in card.card_faces[0]?
                                        // Display multi-faced cards
                                        <>
                                        <img src={card.card_faces[0].image_uris.small} onClick={(e) => clickHandler(e, card)}/>
                                        <DetailsButton img_normal={card.card_faces[0].image_uris.normal} card={card}/> <AddButton card={card} deck={deck} updateDeck={updateDeck}/>
                                        </>
                                        :
                                        <>
                                        {/* // Show the image in the base uris */}
                                        <img src={card.image_uris.small} onClick={(e) => clickHandler(e, card)}/>
                                        <DetailsButton img_normal={card.image_uris.normal} card={card}/> <AddButton card={card} deck={deck} updateDeck={updateDeck}/>
                                        </>
                                    :
                                    <>
                                    {/* // Display the cards without multiple faces */}
                                    <img src={card.image_uris.small} onClick={(e) => clickHandler(e, card)}/>
                                    <DetailsButton img_normal={card.image_uris.normal} card={card}/> <AddButton card={card} deck={deck} updateDeck={updateDeck}/>
                                    </>
                                }
                                {/* <DetailsButton img_normal={card.image_uris.normal} card={card}/> <AddButton card={card} deck={deck} updateDeck={updateDeck}/> */}
                                </div>
                            )
                        })}
                    </div>
                    :
                    <h4 style={{color: 'red'}}>No matches have been found with that filter. Please adjust the parameters or reset the filter.</h4>
                }
                </>
            }
        </>
    )
}