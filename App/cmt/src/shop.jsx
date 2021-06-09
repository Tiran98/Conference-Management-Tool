import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {

    useEffect(() => {
        fetchIItems();
      },[]);
    
    const [items, setItems] = useState([]);
    
    const fetchIItems = async () => {
        const data = await fetch('https://fakestoreapi.com/products');
        const body = await data.json();
        setItems(body);
    }

    return (
        <div>
             <h1>Shop</h1>
            {items.map(item => (
                <h2 key={item.id} style={{ 'marginLeft': '50px' }}>
                    <Link to={`/shop/${item.id}`}>
                        {item.title}
                    </Link>
                </h2>
            ))}
        </div>
    )
}

export default Shop;
