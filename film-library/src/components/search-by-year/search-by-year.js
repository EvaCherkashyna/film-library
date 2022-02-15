import React, { useState, useEffect } from 'react';
import  ReactDOM  from 'react-dom';

export function SearchByYear () {
    
return (
    <div className="container-for-yearInput">
       <input className="form-control year-input" type="text" placeholder="Year"/>
       <button className = "btn btn-primary  year-btn">Search</button>
</div>
);
}
