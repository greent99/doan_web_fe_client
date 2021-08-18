import React from 'react'
import "./BookCard.css"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardFooter
} from 'reactstrap';
import bookimg from '../../book.jpg'
import { Link } from 'react-router-dom';

export default function BookCard(props) {
    const url_detail = `/courses/${props.item.id}`
    const image_url = `http://localhost:5000${props.item.imgpath}`
    return (
        (   
            <div style={{height: "100%"}}>
                <Card style={{height: "100%"}}>
                    <div class='d-flex justify-content-stretch flex-column' style={{height: "100%"}} >
                        <CardImg top src={image_url} alt="Card image cap" />
                        <CardBody >
                            <div class='d-flex justify-content-between flex-column' >
                                <a href={url_detail} class="stretched-link"></a>
                                <CardText className='text-primary text-center'>{props.item.name}</CardText>
                                <CardSubtitle style={{color: 'blueviolet'}} tag="h6" className="mb-2 text-muted">{props.item.author_name}</CardSubtitle>
                                <CardFooter>{props.item.price} đ</CardFooter>
                            </div>
                        </CardBody>
                    </div>
                </Card>
            </div>
        )
    )
}

