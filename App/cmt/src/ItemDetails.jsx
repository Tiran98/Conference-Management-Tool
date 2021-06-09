import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ItemDetails = ({ match }) => {

    useEffect(() => {
        fetchIItem();
      },[]);

    // console.log(match);
    
    const [item, setItem] = useState({
        image: {}
    });
    
    const fetchIItem = async () => {
        const data = await fetch(`https://fakestoreapi.com/products/${match.params.id}`);
        const body = await data.json();
        setItem(body);
        console.log(body);
    }

    return (
        <div>
            <h1>{item.title}</h1>
            <img src={item.image} />
            <h5>{item.description}</h5>
        </div>
    )
}

export default ItemDetails;
