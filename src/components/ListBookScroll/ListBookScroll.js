import {React, useState, useEffect} from 'react'
import { Col, Row } from 'reactstrap'
import BookCard from '../BookCard'
import './ListBookScroll.css'
const axios = require('axios');

export default function ListBookScroll() {
    const [books, setBooks] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/books/getTopOnsale?top=4')
        .then(function (response) {
            if(response.data.status == 200)
            {
                setBooks(response.data.data)
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
          });
    }, [])

    const renderlistBook = (books) => {
        return books.map((item, index) => {
            return <Col sm="3" >
                <BookCard item={item} key={index}></BookCard>
            </Col>
        })
    }

    return (
       <div >
            <Row>
                {renderlistBook(books)}
            </Row>
       </div>
    )
}

