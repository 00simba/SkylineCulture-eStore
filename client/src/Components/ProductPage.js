import React from "react";
import { Link, useParams } from "react-router-dom";
import Counter from './Counter'
import AddToCart from './AddToCart'
import '../index.css'
import { ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from "./BackButton";
import './imageSlide.css'
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery';

export default function ProductPage(props){

    const params = useParams()
    const productUrl = params.productUrl

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
        images.push({original: require(`../Images/${productObj.img[index]}`)})
    })

    class MyGallery extends React.Component {
        render() {
          return <ImageGallery items={images} showFullscreenButton={true} showThumbnails={false} showPlayButton={false}/>;
        }
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
                    limit={1}
                    />
                </Link>
                    <div className="imageContainer">
                        <MyGallery/>
                    </div>

                    <div className="infoContainer">
                        <div className="infoPrice">
                            <h3 className="title">{productObj.title}</h3>
                            <h2 className="price">${productObj.price}</h2>
                        </div>
                        <div className="addCounter">
                            <AddToCart id={productObj.id} product={productObj.title} quantity={quantity} image={productObj.img} price={productObj.price} basePrice={productObj.basePrice} addItemToCart={props.addItemToCart}/>
                            <Counter quantity={quantity} add={add} minus={minus}/>
                        </div>
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

