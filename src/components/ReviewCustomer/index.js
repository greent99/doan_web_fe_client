import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap';
import ListReview from '../ListReview';
import './ReviewCustomer.css'
const axios = require('axios')

export default function ReviewCustomer(props) {
    const [reviews, setReviews] = useState([])
    const [totalReview, setTotalReview] = useState(0)
    const [sortType, setSortType] = useState('asc')
    const [pageSize, setPageSize] = useState(5)
    const [page, setPage] = useState(1)
    const [star1, setStar1] = useState(0)
    const [star2, setStar2] = useState(0)
    const [star3, setStar3] = useState(0)
    const [star4, setStar4] = useState(0)
    const [star5, setStar5] = useState(0)
    let { id } = useParams();

    const handlePage = (page) => {
        setPage(page)
    }

    useEffect(() => {
        // get reviews of book
        axios.get(`http://localhost:5000/api/courses/${id}/reviews`,{
            // params: {
            //     size: pageSize,
            //     sortType: sortType,
            //     page: page
            // }
        })
        .then(function (response) {
            if(response.status == 200)
            {
                setReviews(response.data.reviews)
                setTotalReview(response.data.totalItem)
                setStar1(response.data.star_1)
                setStar2(response.data.star_2)
                setStar3(response.data.star_3)
                setStar4(response.data.star_4)
                setStar5(response.data.star_5)
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
          }); 
    }, [pageSize, sortType, page])

    const listSort = [
        {
            name: 'Sort by date: newest to oldest',
            code: 'desc'
        },
        {
            name: 'Sort by date: oldest to newest',
            code: 'asc'
        }
    ]

    const listPaginate = [5, 10, 15, 20]
    const renderListSort = (listSort) => {
        return listSort.map(item => {
            return <DropdownItem onClick={() => {
                setSortType(item.code)
            }}>{item.name}</DropdownItem>
        })
    }

    const renderListPaginate = (listPaginate, props) => {
        return listPaginate.map(item => {
            return <DropdownItem onClick={() => {
                setPageSize(item)
            }}>Show {item}</DropdownItem>
        })
    }


    const [isOpenSort, setOpenSort] = useState(false)
    const toggle1 = () => setOpenSort(!isOpenSort);
    const [isOpenPaginate, setOpenPaginate] = useState(false);
    const toggle2 = () => setOpenPaginate(!isOpenPaginate);

    const index = (page - 1) * pageSize + 1

    return (
        <div class='border' style={{backgroundColor: '#FDFAFA'}}>
            <div style={{marginLeft: 30, marginRight: 30, marginTop: 30}}>
                <div class='d-flex justify-content-start'>
                    <h5>Customer Reviews</h5>
                </div>
                <div class='d-flex justify-content-start'>
                    {
                        props.book.rating_avg ? <h4>{Math.round(props.book.rating_avg*10) / 10} Star</h4> : <h4>0 Star</h4>
                    }
                </div>
                <div class='d-flex justify-content-start'>
                    <p class='text-primary' style={{marginRight: 15}}>{totalReview} Reivews </p>
                    <p class='text-primary'>5 star({star5})</p>
                    <p class='text-primary'> | 4 star({star4})</p>
                    <p class='text-primary'> | 3 star({star3})</p>
                    <p class='text-primary'> | 2 star({star2})</p>
                    <p class='text-primary'> | 1 star({star1})</p>
                </div>
                {/* <div class='d-flex justify-content-between'>
                    <p class='text-primary'>Showing {index}-{index+pageSize-1} of {totalReview} reviews</p>
                    <div>
                        <ButtonDropdown isOpen={isOpenSort} toggle={toggle1} style={{marginRight: 10}}>
                            <DropdownToggle caret size="sm">
                                Sort By Date
                            </DropdownToggle>
                            <DropdownMenu>
                               {renderListSort(listSort)}
                            </DropdownMenu>
                        </ButtonDropdown>

                        <ButtonDropdown isOpen={isOpenPaginate} toggle={toggle2}>
                            <DropdownToggle caret size="sm">
                                Show {pageSize}
                            </DropdownToggle>
                            <DropdownMenu>
                                {renderListPaginate(listPaginate)}
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                </div> */}
                <div>
                    <ListReview totalItem = {totalReview} reviews = {reviews} pageSize = {pageSize} page = {page} onSelectPage = {handlePage}/>
                </div>
            </div>
        </div>
    )
}
