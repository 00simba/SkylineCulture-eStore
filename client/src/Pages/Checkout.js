import React, { Component, useEffect, useState } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import {Link} from 'react-router-dom';
import Shipping from '../Components/Shipping.js'
import axios from 'axios';
import '../index.css'
import './App.css'
import ReactGA from 'react-ga'

export default function Checkout(props){

  useEffect(() => {
    ReactGA.pageview(window.location.pathname)
  }, [])

  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    address_optional: "", 
    city: "",
    code: "",
    country: "",
    region: "",
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
    await axios.post('https://skylineculture-api.onrender.com/collect', form, {headers:{"Content-Type" : "application/json"}}).then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });
    await axios.post('https://skylineculture-api.onrender.com/create-customer', form, {headers:{"Content-Type" : "application/json"}}).then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });
}

  const shortid = require('shortid');
  const id = shortid.generate();

  const [email, setEmail] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [address_optional, setAddressOptional] = useState('')
  const [city, setCity] = useState('')
  const [code, setCode] = useState('')
 
  const win = window.sessionStorage;

  useEffect(()=>{
    if(win.getItem('email')){
    setEmail(win.getItem('email'))
    form.email=win.getItem('email')
  } 

    if(win.getItem('firstname')){
    setFirstName(win.getItem('firstname'))
    form.firstname=win.getItem('firstname')
    }

    if(win.getItem('lastname')){
    setLastName(win.getItem('lastname'))
    form.lastname=win.getItem('lastname')
    }

    if(win.getItem('address')){
    setAddress(win.getItem('address'))
    form.address=win.getItem('address')
    }

    if(win.getItem('address_optional')){
    setAddressOptional(win.getItem('address_optional'))
    form.address_optional=win.getItem('address_optional')
    }

    if(win.getItem('city')){
    setCity(win.getItem('city'))
    form.city=win.getItem('city')
    }

    if(win.getItem('code')){
    setCode(win.getItem('code'))
    form.code=win.getItem('code')
    }
  
  }, [])

  useEffect(()=>{
    win.setItem('email', email)
    win.setItem('firstname', firstname)
    win.setItem('lastname', lastname)
    win.setItem('address', address)
    win.setItem('address_optional', address_optional)
    win.setItem('city', city)
    win.setItem('code', code)
  }, [email, firstname, lastname, address, address_optional, city, code])

    return(
      <div className='checkoutContainer'>

      <Link to={`/cart`}><div className='backContainer'><div className='backButton' type="button">Back</div></div></Link>

          <h2 className='checkoutHeading'>Checkout</h2>
          
          <div className='formContainer'>

            <form className='checkoutForm' method='POST' action='/collect'>
              

                <span className='contactInfoSpan'>Contact Information</span>

                <input onChange={(event) => {handleChange(event); setEmail(event.target.value)}} value={email} placeholder="Email" id="email" name="email"/>          
                <br/>

                <span  className='shippingInfoSpan'>Shipping Information</span>

                <input onChange={(event) => {handleChange(event); setFirstName(event.target.value)}} value={firstname} placeholder="First Name" id="firstname" name="firstname"/> 
                <br/>
                <input onChange={(event) => {handleChange(event); setLastName(event.target.value)}} value={lastname} placeholder="Last Name" id="lastname" name="lastname"/>
                <br/>
                <input onChange={(event) => {handleChange(event); setAddress(event.target.value)}} value={address} placeholder="Address" id="address" name="address"/>
                <br/>
                <input onChange={(event) => {handleChange(event); setAddressOptional(event.target.value)}} value={address_optional} placeholder="Apartment, Suite, etc (optional)" id="address_optional" name="address_optional"/>
                <br/>
                <input onChange={(event) => {handleChange(event); setCity(event.target.value)}} value={city} placeholder="City" id="city" name="city"/>
                <br/>
                <input onChange={(event) => {handleChange(event); setCode(event.target.value)}} value={code} placeholder="ZIP / Postal Code" id="code" name="code"/>
                <br/>
                <CountryDropdown className="countryDrop" value={location.country} onChange={(val) => {selectCountry(val); form.country=val;}} id="country" name="country"/>
                <br/>
                <RegionDropdown className="regionDrop" country={location.country} value={location.region} onChange={(val) => {selectRegion(val); form.region=val}} id="region" name="region"/>

                <Shipping country={location.country} cart={props.cartItems}/>

                <div className='proceedDiv'>
                  <Link to={`/payment/${id}`}><button disabled={!(email && firstname && lastname && address && city && code &&form.country && form.region) ? true : false} onClick={()=> {props.changeId(id); sendCart(props.cartItems); handleSubmit(); props.changeCountry(form.country)}} className="proceedPayment" type="submit">Proceed to Payment</button></Link>
                </div>
            </form>

          </div>

        </div>
    )

}