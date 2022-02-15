import React, { useState, useEffect } from 'react';
import  ReactDOM  from 'react-dom';

export function SearchByType () {
    
return (
    <div>
            <button className="btn btn-secondary span-category films-span" href="">Movies</button>
            <button className="btn btn-secondary span-category series-span" href="">Series</button>
    </div>
);
}
