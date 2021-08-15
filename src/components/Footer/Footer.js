import React from 'react'
import { Col } from 'reactstrap'
import './Footer.css'
import BookLogo from '../../book_logo.jpg'

export default function Footer() {
    return (
        <div class='footer'>
            <div style={{height: '100%'}} class='d-flex justify-content-center align-items-center'>
                <img src={BookLogo} alt='bookworm icon' width='64' />
            </div>
            <Col sm='1'>
                <h6>BOOKWORM</h6>
                <h6 style={{color: 'white'}}>Address</h6>
                <h6 style={{color: 'white'}}>Phone</h6>
            </Col>
        </div>
    )
}


