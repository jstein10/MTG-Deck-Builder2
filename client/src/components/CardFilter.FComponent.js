import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardStyle from '../styles/CardStyle.module.css';

export default (props) => {
    // Initialize the first set as "aer" since that is the first option in the select
    const [filter, setFilter] = useState({
        currentSet: "e%3Aaer"
    });
    const [sets, setSets] = useState([]);
    const [currentSet, setCurrentSet] = useState("e%3Aaer");
    const [loaded, setLoaded] = useState(false);
    const [power, setPower] = useState();
    const [toughness, setToughness] = useState();
    const [cmc, setCmc] = useState();
    const [nameSearch, setNameSearch] = useState();
    // const [orderBy, setOrderBy] = useState('color');
    // Initialize the operators to be > (greater than is the first option in the select)
    const [operators, setOperators] = useState({
        powOperator: '>',
        touOperator: '>',
        cmcOperator: '>',
    });
    // Initialize all colors to be in the filter
    const [colors, setColors] = useState({
        red: 'r',
        green: 'g',
        blue: 'u',
        black: 'b',
        white: 'w',
        colorless: 'c'
    });
    const [checkboxesChecked, setCheckboxesChecked] = useState({
        red: true,
        green: true,
        blue: true,
        black: true,
        white: true,
        colorless:true,
    });

    useEffect(() => {
        let tempList = [];
        // grab all the sets from scryfall
        axios.get(`https://api.scryfall.com/sets`)
            .then(res => {
                props.setFilterUrl(`https://api.scryfall.com/cards/search?order=color&unique=prints&q=${filter.currentSet}`);
                // console.log("SETS:",res.data);
                res.data.data.forEach(set => {
                    // filter out these set types as the ones we want to offer
                    if((set.set_type == "starter" && set.card_count > 60) || (set.set_type == "commander" && set.card_count > 60)|| set.set_type == "core" || set.set_type == "duel_deck" || set.set_type == "draft_innovation" || set.set_type == "expansion" || set.set_type == "masters"){
                        tempList.push(set);
                    }
                })
                // Sort the array of sets alphabetically by the set name
                tempList.sort(function (a, b){
                    return (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
                });
                setSets(tempList);
                setLoaded(true);
            })
    }, []);
    const changeCurrentSet = (e) => {
        let tempValue = "e%3A" + e.target.value;
        // console.log("TEMP VALUE:",tempValue);
        setCurrentSet(tempValue);
        setFilter({
            ...filter,
            [e.target.name]: tempValue
        });
        
    }
    // https://api.scryfall.com/cards/search?order=power&unique=prints&q=e%3Aaer+(c%3Ar+or+c%3Ag+or+c%3Au+or+c%3Ab+or+c%3Aw+or+c%3Ac)&page=1
    //  https://api.scryfall.com/cards/search?order=power&unique=prints&q=e%3Aaer+(c%3Ar+or+c%3Ag+or+c%3Au+or+c%3Ab+or+c%3Aw)&page=1
    const submitFilter = (e) => {
        e.preventDefault();
        // console.log("Power:",power);
        // console.log("Toughness:",toughness);
        let areColorsChecked = false;
        let orOperator = '+or+';
        let colorsBeingUsed = [];
        // Set the base URL for the axios request
        let tempUrl = `https://api.scryfall.com/cards/search?order=${props.orderBy}&unique=prints&q=`;
        // For each filter (power, toughness, cmc, etc.) append the appropriate string to the url for the request
        for (let [key, value] of Object.entries(filter)) {
            tempUrl+=value;
        }
        // Get a list of colors to be used from the checkboxes
        for (let [color, code] of Object.entries(colors)){
            if(code!=''){
                areColorsChecked = true;
                colorsBeingUsed.push(code);
            }
        }
        // As long as at least 1 color is checked, start appending colors to the axios request URL
        if(areColorsChecked){
            tempUrl+="+(";
            for(let i = 0; i < colorsBeingUsed.length-1; i++){
                tempUrl+=`c%3A${colorsBeingUsed[i]}${orOperator}`;
            }
            tempUrl+=`c%3A${colorsBeingUsed[colorsBeingUsed.length-1]})`;
        }
        console.log("URL:",tempUrl);
        console.log("Filter:",filter);
        setNameSearch('');
        props.setRequestType('get');
        props.setFilterUrl(tempUrl);
    }
    const updatePower = (e) => {
        // console.log("UPDATING POWER");
        // console.log(filter);
        setPower(e.target.value);
        setFilter({
            ...filter,
            power: `+pow${operators.powOperator}${e.target.value}`
        });
    }
    const updateToughness = (e) => {
        // console.log("UPDATING Toughness");
        // console.log(filter);
        setToughness(e.target.value);
        setFilter({
            ...filter,
            toughness: `+tou${operators.touOperator}${e.target.value}`
        });
    }
    const updateCmc = (e) => {
        setCmc(e.target.value);
        setFilter({
            ...filter,
            cmc: `+cmc${operators.cmcOperator}${e.target.value}`
        });
    }
    // Takes care of the >, <, or = for the power, toughness, and cmc
    const updateOperators = (e) => {
        // console.log(e.target.name,':',e.target.value);
        setOperators({
            ...operators,
            [e.target.name]: e.target.value
        });
    }
    const updateColors = (e) => {
        let tempValue;
        if(e.target.checked){
            tempValue = e.target.value;
            setCheckboxesChecked({
                ...checkboxesChecked,
                [e.target.name]: true
            });
        }
        else{
            tempValue = '';
            setCheckboxesChecked({
                ...checkboxesChecked,
                [e.target.name]: false
            });
        }
        setColors({
            ...colors,
            [e.target.name]: tempValue
        });
    }
    // Put everything back to default except the set they were looking at
    const initializeFilter = () => {
        let tempSet = currentSet;
        console.log("TEMPSET:",tempSet);
        console.log(filter);
        setPower('');
        setToughness('');
        setCmc('');
        setColors({
            red: 'r',
            green: 'g',
            blue: 'u',
            black: 'b',
            white: 'w',
            colorless: 'c'
        });
        setCheckboxesChecked({
            red: true,
            green: true,
            blue: true,
            black: true,
            white: true,
            colorless:true
        });
        setFilter({
            currentSet: tempSet
        });
    }
    const resetFilter = (e) => {
        initializeFilter();
        setNameSearch(''); //Not in the initializeFilter so that the search field isn't cleared when "search" is clicked.
        props.setRequestType('get');
        props.setFilterUrl(`https://api.scryfall.com/cards/search?order=${props.orderBy}&unique=prints&q=${currentSet}`);
    }
    function isLetter(str) {
        var letters = /^[A-Za-z]+$/;
        if(str.match(letters)){return true;}
        else{return false;}
      }
    const searchByName = () => {
        // console.log(nameSearch);
        initializeFilter();
        // Sanitize the nameSearch to be useable in urls
        let tempString = '';
        for(let i = 0; i < nameSearch.length; i++){
            if(isLetter(nameSearch[i])){
                tempString += nameSearch[i];
            }
            else if(nameSearch[i] == ' '){
                tempString += '+'
            }
        }
        // console.log(tempString);
        // console.log(isLetter(nameSearch));
        props.setRequestType('post');
        props.setFilterUrl(`https://api.scryfall.com/cards/autocomplete?q=${tempString}`)
    }

    return(
        <div className={CardStyle.cardFilter}>
            {loaded && (<>
                <label className={CardStyle.cardFilterLabel}>Card Set:</label>
                <select onChange={changeCurrentSet} name="currentSet">
                {sets.map((set, index) => {
                    return(
                        <option key={index} value={set.code}>{set.name}</option>
                    )
                })}
                </select>
                </>
            )}
            <form onSubmit={submitFilter}>
                <label className={CardStyle.cardFilterLabel}>Power: </label>
                <select name="powOperator" onChange={updateOperators}>
                    <option value=">">Greater Than</option>
                    <option value="<">Less Than</option>
                    <option value="=">Equal To</option>
                </select>
                <input type="number" name="power" value={power} onChange={updatePower}/>
                <br/>
                <label className={CardStyle.cardFilterLabel}>Toughness: </label>
                <select name="touOperator" onChange={updateOperators}>
                    <option value=">">Greater Than</option>
                    <option value="<">Less Than</option>
                    <option value="=">Equal To</option>
                </select>
                <input type="number" name="toughness" value={toughness} onChange={updateToughness}/>
                <br/>
                <label className={CardStyle.cardFilterLabel}>CMC: </label>
                <select name="cmcOperator" onChange={updateOperators}>
                    <option value=">">Greater Than</option>
                    <option value="<">Less Than</option>
                    <option value="=">Equal To</option>
                </select>
                <input type="number" name="cmc" value={cmc} onChange={updateCmc}/>
                <br/>
                <label className={CardStyle.cardFilterLabel}>Colors</label>
                {/* <label>Red</label> */}
                <img className={CardStyle.colorImage} src="https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/8/87/R.svg?version=3bc9e4e594c766c0f617dcd247ca8569"/>
                <input type="checkbox" name="red" value='r' checked={checkboxesChecked.red} onChange={updateColors}/>
                {/* <label>Green</label> */}
                <img className={CardStyle.colorImage} src="https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/8/88/G.svg?version=10a8df5aad537bef84263bc122456a04"/>
                <input type="checkbox" name="green" value='g' checked={checkboxesChecked.green} onChange={updateColors}/>
                {/* <label>Blue</label> */}
                <img className={CardStyle.colorImage} src="https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/9/9f/U.svg?version=bde0bfe27798651340d9588121a78bdb"/>
                <input type="checkbox" name="blue" value='u' checked={checkboxesChecked.blue} onChange={updateColors}/>
                {/* <label>Black</label> */}
                <img className={CardStyle.colorImage} src="https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/2/2f/B.svg?version=7a492827f1cd9a81d7e2e46a7ef09818"/>
                <input type="checkbox" name="black" value='b' checked={checkboxesChecked.black} onChange={updateColors}/>
                {/* <label>White</label> */}
                <img className={CardStyle.colorImage} src="https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/8/8e/W.svg?version=41d3dee7e4012b580321ca0cb9308e17"/>
                <input type="checkbox" name="white" value='w' checked={checkboxesChecked.white} onChange={updateColors}/>
                {/* <label>Colorless</label> */}
                <img className={CardStyle.colorImage} src="https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/1/1a/C.svg?version=063a55dc4de19c0099bf62e77ff3e358"/>
                <input type="checkbox" name="colorless" value='c' checked={checkboxesChecked.colorless} onChange={updateColors}/>
                <br/>
                <label className={CardStyle.cardFilterLabel}>Order By: </label>
                <select name="order" onChange={(e) => props.setOrderBy(e.target.value)}>
                    <option value="color">Color</option>
                    <option value="name">Name</option>
                    <option value="power">Power</option>
                    <option value="toughness">Toughness</option>
                    <option value="cmc">CMC</option>
                    <option value="rarity">Rarity</option>
                </select>
                <br/>
                <input type="submit" value="Filter"/>
            </form>
            <button onClick={resetFilter}>Reset Filter</button>
            <br/>
            <button onClick={searchByName}>Search</button>
            <input type="text" name="name" value={nameSearch} onChange={(e) => setNameSearch(e.target.value)}/>
        </div>
    )
}