import React from 'react'
import Paginate from '../Paginate/Paginate'

export default function ListReview(props) {

    const renderlistReview = (reviews) => {
        return reviews.map((item, index) => {
            const date = new Date(item.createddat)
            const dateFormat = date.toLocaleDateString("en-US")
            return <div key={index} style={{marginTop: 10}} class='d-flex flex-column justify-content-start'>
                <div class='d-flex'>
                    <h5 >{item.point} Star</h5>
                </div>
                <div class='d-flex justify-content-start'>
                    <p class='text-primary'>{item.comment}</p>
                </div>
                <div class='d-flex justify-content-start'>
                    <p class='text-primary'>{dateFormat}</p>
                </div>
                <hr></hr>
            </div>
        })
    }

    return (
        <div>
            <div>
                {renderlistReview(props.reviews)}
            </div>
            <div class='d-flex justify-content-center'>
                <Paginate totalItem = {props.totalItem} pageSize = {props.pageSize} page = {props.page} onSelectPage = {props.onSelectPage}/>
            </div>
        </div>
    )
}
