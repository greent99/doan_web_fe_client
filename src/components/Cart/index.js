import {React, useContext, useEffect} from 'react'
import { Row, Button,} from 'reactstrap'
import './Cart.css'
import bookimg from '../../book.jpg'
import { CartContext } from '../../context/CartContext'
import TableWatchList from '../TableWatchList/index'
import TableEnrollList from '../TableEnrollList'
import getDataLogin from '../../utils/getDataLogin'
const axios = require('axios')

export default function Cart() {

    const {cartItems, increase, decrease, total, handleCheckout} = useContext(CartContext)
    const dataLogin = getDataLogin()
    console.log(dataLogin)

    const renderBookIncart = (cart) => {
        return cart.map(item => {
            const url_detail = `http://localhost:3001/book/${item.id}`
            return (<tr key={item.id}>
                <th class='d-flex justify-content-start'>
                    <img  height='100'  src={bookimg} alt="Card image cap"/>
                    <div class='d-flex align-items-center justify-content-center flex-column'>
                        
                        <h6 class='text-primary'>{item.book_title}</h6>
                        <p class='text-primary'>{item.author.author_name}</p>
                    </div>
                </th>
                <td>
                    {item.book_price}$
                </td>
                <td>
                    <div class='d-flex flex-row justify-content-around align-items-center' >
                        <Button size='sm' onClick={() => increase(item)}>+</Button>
                        
                        <h5>{item.quantity}</h5>
                        <Button size='sm' onClick={() => decrease(item)}>-</Button>
                    </div>
                </td>
                <td>{Math.round(item.quantity*item.book_price * 100) / 100}$</td>
            </tr>)
        })
    }

    const placeOrder = () =>
    {
        const data = {order_amount: +total, productArr: cartItems}
        axios.post(`http://localhost:3000/orders/add`, data)
        .then(function (response) {
            if(response.data.status == 200)
            {
                handleCheckout()
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
          })
    }

    return (
            <div class='container' style={{marginTop: 50}}>
                {/* <div class='d-flex justify-content-start'>
                    {cartItems.length === 0 ? <h5>Your cart is empty</h5>
                    : <h5>Your cart: {cartItems.length} items</h5>
                    }
                </div> */}
                <hr></hr>
                <div>
                    {dataLogin.user && dataLogin.user.userType == 'Student' ?
                    <div>
                        <div class="d-flex jusfity-content-start">
                            <h5>Your watch list</h5>
                        </div>
                        <Row>
                            <TableWatchList />
                        </Row>

                        <div class="d-flex jusfity-content-start">
                            <h5>Your Enroll list</h5>
                        </div>
                        <Row>
                            <TableEnrollList />
                        </Row>
                    </div>
                    : <p>oke</p>
                    }

                    { dataLogin.user && dataLogin.user.userType == 'Teacher' ?
                        <div>
                            <div class="d-flex jusfity-content-start">
                                <h5>Your watch list</h5>
                            </div>
                            <Row>
                                <TableWatchList />
                            </Row>
                        </div>
                    : <p>oke</p>
                    }
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
    )
}
