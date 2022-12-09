import React from 'react';
import './index.css';
import data from './Data/Data.js'
import Header from './Components/Header';
import LandingPage from './Pages/LandingPage/LandingPage';
import Products from './Components/Product';
import ProductPage from './Components/ProductPage/ProductPage'
import { useLocation, Routes, Route } from 'react-router-dom';
import CartPage from './Components/CartPage'
import './index.css';
import Checkout from './Pages/Checkout'
import WebsiteBanner from './Components/WebsiteBanner/WebsiteBanner';
import Footer from './Components/Footer/Footer';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import Payment from './Pages/Payment/Payment'
import OrderComplete from './Pages/OrderComplete/OrderComplete';
import Keychains from './Pages/Keychains/Keychains';
import Stickers from './Pages/Stickers/Stickers';
import DiecastCars from './Pages/DiecastCars/DiecastCars';

export default function Website(){

    const [cartItems, setCartItems] = React.useState([]);
    const location = useLocation();   
    const [id, setId] = React.useState(null)

    React.useEffect(() => {
        const data = localStorage.getItem('cart')
        if(data){
            setCartItems(JSON.parse(data))
        }
        const uniqueID = localStorage.getItem('id')
        if(uniqueID){
            setId(uniqueID)
        }
    }, [])

    React.useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
        localStorage.setItem('id', id)
    })

    cartItems.slice(1);
    
    function addItemToCart(id, product, quantity, variant, image, price, url){

        let picture = image[0]
        image.forEach((image) => {
            if(image.includes(variant)){
                picture = image
            }
        })

        var found=0;

        cartItems.forEach((cartItem) => {
            var x = cartItem.productName; 
            var y = cartItem.productVariant
            if(x == product && y == variant){
                found=1;
                cartItem.productQuantity = `${quantity}`;
            }
            if(x == product && cartItem.productVariant == "null"){
                found=1;
                cartItem.productQuantity = `${quantity}`;
            }     
        })

        if(found==0){
            setCartItems([...cartItems, {productId: `${id}`, productName: `${product}`, productQuantity: `${quantity}`, productVariant: `${variant}`,productImage: `${picture}`, productPrice: `${price}`, productUrl: `${url}`}])
        }      
    }

    const [country, setCountry] = React.useState('')
    function changeCountry(country){
        setCountry(country)
    }

    const productUrl = []

    data.forEach((object) => {
        for(let key in object){
            if(key === "url"){
                productUrl.push(object[key])
            }
        }
    })

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

    return(
        <div>
            {![`/checkout/${id}`, `/payment/${id}`].includes(location.pathname) && <WebsiteBanner/>} 
            {![`/checkout/${id}`, `/payment/${id}`].includes(location.pathname) && <Header/>} 
            <Routes>   
                    <Route path='/' element={<LandingPage data={data}/>}/>
                    <Route path={`product/:productUrl`} element={<ProductPage productUrl = {productUrl} addItemToCart = {addItemToCart} cart={cartItems} items={products}/>}/>
                    <Route path='/cart' element={<CartPage changeId={id => setId(id)} setCartItems={setCartItems} cartItems={cartItems}/>}/>
                    <Route path={`/checkout/${id}`} element={<Checkout changeCountry={changeCountry} changeId={id => setId(id)} cartItems={cartItems}/>}></Route>
                    <Route path={`/payment/${id}`} cartItems={cartItems} element={<Payment country={country} changeId={id => setId(id)} cartItems={cartItems}/>}></Route>
                    <Route path={`/order-complete`} element={<OrderComplete/>}/>
                    <Route path={`/keychains`} element={<Keychains data={data}/>}/>
                    <Route path={`/stickers`} element={<Stickers data={data}/>}/>
                    <Route path={`/diecast-cars`} element={<DiecastCars data={data}/>}/>
                    <Route path="/*" element={<PageNotFound/>}/>
            </Routes>
            {![`/checkout/${id}`, `/payment/${id}`].includes(location.pathname) && <Footer/>}
        </div>
    )
}