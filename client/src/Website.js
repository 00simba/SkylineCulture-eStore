import React from 'react';
import './index.css';
import data from './Data/Data.js'
import Header from './Components/Header';
import LandingPage from './Pages/LandingPage/LandingPage';
import Products from './Components/Product';
import ProductPage from './Pages/ProductPage/ProductPage'
import { useLocation, Routes, Route } from 'react-router-dom';
import CartPage from './Components/CartPage'
import './index.css';
import WebsiteBanner from './Components/WebsiteBanner/WebsiteBanner';
import Footer from './Components/Footer/Footer';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import OrderComplete from './Pages/OrderComplete/OrderComplete';
import Keychains from './Pages/Keychains/Keychains';
import Stickers from './Pages/Stickers/Stickers';
import DiecastCars from './Pages/DiecastCars/DiecastCars';
import TrackOrder from './Pages/TrackOrder/TrackOrder';
import TermsAndService from './Pages/TermsAndService/TermsAndService';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import ContactUs from './Pages/ContactUs/ContactUs';
import shortid from 'shortid';
import SearchPage from './Pages/SearchPage/SearchPage.js';

export default function Website(){

    const [cartItems, setCartItems] = React.useState([]);
    const location = useLocation();   
    const [id, setId] = React.useState(shortid.generate());

    React.useEffect(() => {
        setId(shortid.generate())
        const data = localStorage.getItem('cart')
        if(data){
            setCartItems(JSON.parse(data))
        }
    }, [])

    React.useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    })

    cartItems.slice(1);

    function addItemToCart(id, product, quantity, variant, image, price, sale_price, url){

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
            setCartItems([...cartItems, {productId: `${id}`, productName: `${product}`, productQuantity: `${quantity}`, productVariant: `${variant}`,productImage: `${picture}`, productPrice: `${price}`, salePrice: `${sale_price}`, productUrl: `${url}`}])
        }      
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
                stars={item.stars}
            />
        )
    })

    return(
        <div>
            {![`/checkout/${id}`, `/payment/${id}`].includes(location.pathname) && <WebsiteBanner/>} 
            {![`/checkout/${id}`, `/payment/${id}`].includes(location.pathname) && <Header/>} 
            <Routes>   
                    <Route path='/' element={<LandingPage data={data}/>}/>
                    <Route path='/search-result' element={<SearchPage/>}/>
                    <Route path={`product/:productUrl`} element={<ProductPage productUrl = {productUrl} addItemToCart = {addItemToCart} cart={cartItems} items={products}/>}/>
                    <Route path='/cart' element={<CartPage setCartItems={setCartItems} cartItems={cartItems}/>}/>
                    <Route path={`/order/*`} element={<OrderComplete orderID={id}/>}/>
                    <Route path={`/keychains`} element={<Keychains data={data}/>}/>
                    <Route path={`/stickers`} element={<Stickers data={data}/>}/>
                    <Route path={`/diecast-cars`} element={<DiecastCars data={data}/>}/>
                    <Route path={`/track-order`} element={<TrackOrder/>}/>
                    <Route path={`/contact-us`} element={<ContactUs/>}/>
                    <Route path={`/terms-and-service`} element={<TermsAndService/>}/>
                    <Route path={`/privacy-policy`} element={<PrivacyPolicy/>}/>
                    <Route path="/*" element={<PageNotFound/>}/>
            </Routes>
            {![`/checkout/${id}`, `/payment/${id}`].includes(location.pathname) && <Footer/>}
        </div>
    )
}