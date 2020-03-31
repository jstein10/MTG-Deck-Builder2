import React, { useState } from 'react'
import Plot from 'react-plotly.js'

// NOTE: Gary needs to have this entire file commented out, because the plotly add-on will cause his
// crappy old surface to run out of memory and as a result the project will crash upon attemptinng
// to build it.

export default props => {

    let barChart = {};
    let barX = [];
    let barY =[];

    let pieChart = {};
    let pieValues = [];
    let pieLabels = [];

    const setCharts = (deck) => {
        // console.log(deck)
        Object.keys(deck).map((key, index) => {
            // console.log(key);
            // console.log(deck[key].cmc in barChart)
            if(deck[key].cmc in barChart){
                barChart[deck[key].cmc]+=1
                // barChart[deck[key].cmc]+=deck[key].count_in_deck **NOTE** deck[key].count_in_deck is broken and gives wrong numbers. Setting to 1 for now.
            }else{
                barChart[deck[key].cmc]=1
                // barChart[deck[key].cmc]=deck[key].count_in_deck **NOTE** above^
            }
            console.log(deck[key].colors.length)
            // if(deck[key].colors[0] )
            if(deck[key].colors.length===0){
                if('colorless' in pieChart){
                    pieChart['colorless']+=1
                    // pieChart['colorless']+=deck[key].count_in_deck; **NOTE** above^
                }else {
                    pieChart['colorless']=1
                    // pieChart['colorless']=deck[key].count_in_deck; **NOTE** above^
                }
            } else if (deck[key].colors[0] in pieChart) {
                pieChart[deck[key].colors[0]]+=1
                // pieChart[deck[key].colors[0]]+=deck[key].count_in_deck **NOTE** above^
            } else {
                pieChart[deck[key].colors[0]] =1
                // pieChart[deck[key].colors[0]] =deck[key].count_in_deck **NOTE** above^
            }
            
        })
    }

    if (props.deck){
        setCharts(props.deck);
        console.log(barChart);
        for (let [key, value] of Object.entries(barChart)) {
            // console.log(key, value)
            barX.push(Number(key));
            barY.push(value);
            // console.log(barX, barY)
        }
        console.log(pieChart);
        for (let [key, value] of Object.entries(pieChart)) {
            pieLabels.push(key);
            pieValues.push(value);
        }
        console.log(pieLabels, pieValues)
    }

    return (
        <div>
            <Plot 
                data={[
                    {type: 'bar', x:barX, y:barY }
                ]}
                layout={{width:320, height: 240, title: 'Mana Curve'}}
                staticPlot={true}
            />
            <Plot 
                data={[
                    {values: pieValues,
                    labels: pieLabels,
                    type: 'pie'}
                ]}
                layout={{width:320, height: 240, title: 'Color Percentage'}}
            />
        </div>
    )
}
