import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Counter from '../../Components/Counter'
import AddToCart from '../../Components/AddToCart'
import '../../index.css'
import { ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from "../../Components/BackButton";
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery';
import Dropdown from "../../Components/Dropdown/Dropdown";
import './productpage.css'
import axios from "axios";
import ReactGA from 'react-ga'

export default function ProductPage(props){

    useEffect(() => {
        ReactGA.pageview(window.location.pathname)
    }, [])

    const params = useParams()
    const productUrl = params.productUrl
    
    if(!props.productUrl.includes(productUrl)){
        window.location.replace("/*");    
    }

    let index;

    for(const items in props.items){
        if(props.items[items].props.item.url === productUrl){
            index = (props.items[items].props.item.id)-1
        }
    }

    const productObj = props.items[index].props.item;

    const [quantity, setQuantity] = React.useState(1)
    
    function add(){
        setQuantity(quantity+1)
    }

    function minus(){
        if(quantity === 1){
            return quantity
        }
        else{
            setQuantity(quantity-1)
        }
    }

    let images = []

    productObj.img.forEach((img, index) => {
        images.push({original: require(`../../Images/${productObj.img[index]}`)})
    })

    class MyGallery extends React.Component{
        render() {
          return <ImageGallery items={images} showFullscreenButton={true} showThumbnails={false} showPlayButton={false}/>;
        }
    }

    const [selected, setSelected] = React.useState(null);

    const [productStock, setStock] = React.useState(null);

    useEffect(() => {
        axios.post('https://skylineculture-api.onrender.com/get-stock', {productName: productObj.title}).then((res) => setStock(res.data[0].stock)).catch((err) => console.error(err))
    }, [])

    let soldOut = false

    if(productStock){
        productStock.forEach((obj) => {
            for(const [key, value] of Object.entries(obj)){
                if((key === selected || key === "Default") && value == 0){
                    soldOut = true
                }
            }
        })
    }
    
    return(
        <div>
            <div className="backContainer">
                <BackButton/>
            </div>
            <div className="productContainer">
    
                <Link to='/cart'>
                    <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Slide}
                    />
                </Link> 
                
                    <div className="imageContainer">
                        <MyGallery/>
                    </div>

                    <div className="infoContainer">
                        <div className="productInfo">
                            <div className="infoPrice">
                                <h3 className="title">{productObj.title}</h3>
                                {soldOut ? <h2 className="price">SOLD OUT</h2> : <div className='productPagePrice'><h3 className="prices"><s>${productObj.price}</s></h3><h3 className="salePrice">${productObj.sale_price}</h3></div>}
                            </div>
                            <div className="addCounter">
                                <AddToCart disabled={soldOut} id={productObj.id} product={productObj.title} quantity={quantity} variant={selected} variants={productObj.variants} image={productObj.img} price={productObj.price} sale_price={productObj.sale_price} basePrice={productObj.basePrice} url={productObj.url} addItemToCart={props.addItemToCart}/>
                                <Counter quantity={quantity} add={add} minus={minus}/>
                            </div>
                        </div>
                        {productObj.hasOwnProperty('variants') && <div className="optionsContainer">
                            {(productObj.variants).map(variant => <Dropdown setSelected={setSelected} options={variant}/>)}
                        </div>}
                    </div>
                    <div className="productDesc">    
                        <div className="descWrapper">
                            <h3 className="descriptionHeader">Description</h3>
                            {(productObj.description).map((item) => <p>{item}<br/></p>)}
                            <h3 className="detailsHeader">Details</h3>
                            {productObj.specs}
                            <h3 className="shippingHeader">Shipping</h3>
                            {(productObj.shipping).map((item) => <p>{item}<br/></p>)}
                        </div>
                    </div>
            </div>
        </div>
        
    )
}
