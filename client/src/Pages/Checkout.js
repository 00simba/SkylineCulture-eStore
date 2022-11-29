import React, { Component, useState } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import {Link} from 'react-router-dom';
import Shipping from '../Components/Shipping.js'
import axios from 'axios';
import '../index.css'

export default function Checkout(props){

  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    address_optional: "", 
    city: "",
    code: "",
  })

  const [location, setLocation] = React.useState([])

  
  function selectCountry(val){
    setLocation({...location, country: val})
  }
  
  function selectRegion(val){
    setLocation({...location, region: val})
  }

  function handleChange(event){
      const newForm = {...form}
      newForm[event.target.id] = event.target.value
      setForm(newForm)
    }

  async function sendCart(items){
    await axios.post("https://skylineculture-api.onrender.com/get-items", {items})

  }

  async function handleSubmit(){
      // event.preventDefault();
        await axios.post('https://skylineculture-api.onrender.com/collect', form, {headers:{"Content-Type" : "application/json"}}).then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
      setForm({
        email: "",
        firstname: "",
        lastname: "",
        address: "",
        address_optional: "", 
        city: "",
        code: "",
      })
  }

  const shortid = require('shortid');
  const id = shortid.generate();
  console.log("Checkout:" + id)
    return(
      <div className='checkoutContainer'>

      <Link to={`/cart`}><div className='backContainer'><div className='backButton' type="button">Back</div></div></Link>

          <h2 className='checkoutHeading'>Checkout</h2>
          
          <div className='formContainer'>

            <form className='checkoutForm' method='POST' action='/collect'>
              

                <span className='contactInfoSpan'>Contact Information</span>

                <input onChange={(event) => handleChange(event)} placeholder="Email" id="email" name="email"/>          
                <br/>

                <span  className='shippingInfoSpan'>Shipping Information</span>

                <input onChange={(event) => handleChange(event)} placeholder="First Name" id="firstname" name="firstname"/> 
                <br/>
                <input onChange={(event) => handleChange(event)} placeholder="Last Name" id="lastname" name="lastname"/>
                <br/>
                <input onChange={(event) => handleChange(event)} placeholder="Address" id="address" name="address"/>
                <br/>
                <input onChange={(event) => handleChange(event)} placeholder="Apartment, Suite, etc (optional)" id="address_optional" name="address_optional"/>
                <br/>
                <input onChange={(event) => handleChange(event)} placeholder="City" id="city" name="city"/>
                <br/>
                <input onChange={(event) => handleChange(event)} placeholder="ZIP / Postal Code" id="code" name="code"/>
                <br/>
                <CountryDropdown className="countryDrop" value={location.country} onChange={(val) => selectCountry(val)} name="country"/>
                <br/>
                <RegionDropdown className="regionDrop" country={location.country} value={location.region} onChange={(val) => selectRegion(val)} name="region"/>

                <Shipping country={location.country}/>

                <div className='proceedDiv'>
                <Link to={`/collect-payment/${id}`}><button onClick={()=> {props.changeId(id); sendCart(props.cartItems); handleSubmit()}} className="proceedPayment" type="submit">Proceed to Payment</button></Link>
                </div>
            </form>

          </div>

        </div>
    )

}