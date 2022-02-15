import React, { useState, useEffect } from 'react';
import  ReactDOM  from 'react-dom';
import SearchByTitle from '../search-by-title';
import SearchByType from '../search-by-type';
export function Header () {
    
return (
 <div class="navbar navbar-expand-lg navbar-dark">
        <h1 className="nav-h1"> Write the name of the movie</h1>
       <SearchByTitle/>
        <div className="label-containers">
            <SearchByType/>
            <div className="container-for-yearInput">
                <input className="form-control year-input" type="text" placeholder="Year"/>
                <button className = "btn btn-primary  year-btn">Search</button>
            </div>
        </div>
    </div>
);
}

