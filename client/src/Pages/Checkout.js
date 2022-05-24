import React, { Component, useState } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Shipping from '../Components/Shipping.js'
import axios from 'axios';
import '../index.css'



export default function Checkout(props){

  const [location, setLocation] = React.useState([])
  
  function selectCountry(val){
    setLocation({...location, country: val})
  }
  
  function selectRegion(val){
    setLocation({...location, region: val})
  }

  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    address_optional: "", 
  })

  function handleChange(event){
      const newForm = {...form}
      newForm[event.target.id] = event.target.value
      setForm(newForm)
    }


  function handleSubmit(event){
      event.preventDefault();
      axios.post('http://localhost:3001/collect', {form})
      setForm({
        email: "",
        firstname: "",
        lastname: "",
        address: "",
        address_optional: "", 
      })
  }
        
    return(
        <form method='POST' action='/collect' submitForm={(event) => handleSubmit(event)}>
            <h2>Contact Information</h2>

            <input onChange={(event) => handleChange(event)} placeholder="Email" id="email"name="customer_email"/>          
            <br/>

            <h2>Shipping Address</h2>

            <input onChange={(event) => handleChange(event)} placeholder="First Name" id="firstname" name="first_name"/> 
            <br/>
            <input onChange={(event) => handleChange(event)} placeholder="Last Name" id="lastname" name="last_name"/>
            <br/>
            <input onChange={(event) => handleChange(event)} placeholder="Address" id="address" name="customer_address"/>
            <br/>
            <input onChange={(event) => handleChange(event)} placeholder="Apartment, Suite, etc (optional)" id="address_optional" name="customer_optional_address"/>
  
            <CountryDropdown value={location.country} onChange={(val) => selectCountry(val)} name="country"/>
            <br/>
            <RegionDropdown country={location.country} value={location.region} onChange={(val) => selectRegion(val)} name="region"/>
            <br/>
            <Shipping country={location.country}/>

            <button className="proceedPayment" type="submit">Proceed to Payment</button>
        </form>
    )

}