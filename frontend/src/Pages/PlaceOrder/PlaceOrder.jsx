import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHnadler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }
  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("Error");
    }
  }
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token])
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHnadler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHnadler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHnadler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHnadler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHnadler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHnadler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHnadler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHnadler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHnadler} value={data.phone} type="text" placeholder='Phone' />
      </div>


      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>

            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>

            <hr />
            <div className='cart-total-details'>
              <b>Total </b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>

          </div>
          <input type="radio" name='payment' value="cash on delivery"/>
          <label htmlFor="">Cash on delivery</label>
          <input type="radio" name='payment' value="Stripe"/>
          <label htmlFor="">Stripe</label>
          <button type='submit' >Place Order</button>
        </div>

      </div>

    </form>
  )
}

export default PlaceOrder
