import React from 'react';
import './index.css';
import data from './Data/Data.js'
import Header from './Components/Header';
import Products from './Components/Product';
import ProductPage from './Components/ProductPage'
import { useLocation, BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import CartPage from './Components/CartPage'
import './index.css';
import Checkout from './Pages/Checkout'
import Payment from './Pages/Payment'


export default function Website(){

    const products = data.map(item => {
        return(
            <Products 
                key={item.id}
                id={item.id}
                title={item.title}
                item={item}    
            />
        )
    })


    const [cartItems, setCartItems] = React.useState([]);



    React.useEffect(() => {
        const data = localStorage.getItem('cart')
        if(data){
            setCartItems(JSON.parse(data))
        }
    }, [])

    React.useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    })

    cartItems.slice(1);
    console.log(cartItems)
    
    function addItemToCart(id, product, quantity, image, price){

        var found=0;

        cartItems.forEach((cartItem) => {
            var x = cartItem.productName; 
            var y = cartItem.productQuantity;  
            if(x == product){
                found=1;
                cartItem.productQuantity = `${quantity}`;
                console.log("Updated Quantity")
                console.log(cartItems)
            }       
        })

        if(found==0){
            setCartItems([...cartItems, {productId: `${id}`, productName: `${product}`, productQuantity: `${quantity}`, productImage: `${image}`, productPrice: `${price}`}])
        }      
    }

    const location = useLocation()

    return(
        <div>
            {!["/checkout", "/collect-payment"].includes(location.pathname) && <Header/>}
            <Routes>           
                <Route path='/' element={<div className='parent'>{products}</div>}/>
                <Route path='product/:productUrl' element={<ProductPage addItemToCart = {addItemToCart} cart={cartItems} items={products}/>}/>
                <Route path='/cart' element={<CartPage setCartItems={setCartItems} cartItems={cartItems}/>}/>
                <Route path='/checkout' element={<Checkout cartItems={cartItems}/>}></Route>
                <Route path='/collect-payment' cartItems={cartItems} element={<Payment cartItems={cartItems}/>}></Route>
            </Routes>
        </div>
    )
}