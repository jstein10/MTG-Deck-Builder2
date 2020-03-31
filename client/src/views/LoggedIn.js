import React from 'react'
import FilterCardList from '../components/FilterCardList'

export default function Main() {
    return (
        <div>
            {/* <div style={{width: '500px', height: '500px', backgroundColor: 'blue'}}></div> */}
            <div style={{width: '500px', height: '500px', overflow: 'scroll', marginLeft: '55%'}}>
                <FilterCardList/>
            </div>
        </div>
    )
}
