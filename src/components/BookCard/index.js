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
    return (
        (
            <div style={{height: "100%"}}>
                <Card style={{height: "100%"}}>
                    <div class='d-flex justify-content-stretch flex-column' style={{height: "100%"}} >
                        <CardImg top src={bookimg} alt="Card image cap" />
                        <CardBody >
                            <div class='d-flex justify-content-between flex-column' >
                                <a href={url_detail} class="stretched-link"></a>
                                <CardText >{props.item.name}</CardText>
                                <CardSubtitle style={{color: 'blueviolet'}} tag="h6" className="mb-2 text-muted">{props.item.author}</CardSubtitle>
                                <CardFooter>{props.item.price} $</CardFooter>
                            </div>
                        </CardBody>
                    </div>
                </Card>
            </div>
        )
    )
}

