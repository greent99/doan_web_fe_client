import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router';
import bookimg from '../../book.jpg'

export default function BookDetailTitle(props) {
    const image_url = `http://localhost:5000${props.course.imgpath}`
    return (
        <div class='d-flex justify-content-start border'>
            <div class='col-sm-4 d-flex justify-content-start'>
                <div class='d-flex flex-column'>
                    <img width='100%' src={image_url} alt="Card image cap" />
                    <div >
                        <p class='text-primary'>By (author) {props.course.author_name}</p>
                    </div>
                </div>
            </div>
            <div class=' d-flex justify-content-start'>
                <div class='d-flex flex-column'>
                    <div class='d-flex justify-content-start'>
                        <h5>{props.course.name}</h5>
                    </div>
                    <p class='text-primary'>
                        {props.course.description}
                    </p>
                </div>
            </div>
        </div>
    )
}
