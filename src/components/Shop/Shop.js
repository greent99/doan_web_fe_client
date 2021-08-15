import {React, useState, useEffect} from 'react'
import './Shop.css'
import '../../index.css'
import { Row, Col } from 'reactstrap'
import FilterBook from '../FilterBook/FilterBook'
import ShopContent from '../ShopContent/ShopContent'
const axios = require('axios')

export default function Shop() {
    const [category, setCategory] = useState('')
    const [author, setAuthor] = useState('')
    const [rating, setRating] = useState('')
    const [sortType, setSortType] = useState('onSale')
    const [pageSize, setPageSize] = useState(20)
    const [page, setPage] = useState(1)
    const [totalItem, setTotalItem] = useState(0)
    const [books, setBooks] = useState([])
    const [filterParam, setFilterParam] = useState({})
    const [filterTitle, setFilterTitle] = useState('')
    useEffect(() => {
        setFilterParam({
            category: category
        })
        setSortType('onSale')
        setPageSize(20)
        setPage(1)
    },[category])
    useEffect(() => {
        setFilterParam({
            author: author
        })
        setSortType('onSale')
        setPageSize(20)
        setPage(1)
    },[author])
    useEffect(() => {
        setFilterParam({
            rating: rating
        })
        setSortType('onSale')
        setPageSize(20)
        setPage(1)
        setFilterTitle(`${rating} star`)
    },[rating])
    useEffect(() => {
        setFilterParam(filterParam => ({
            ...filterParam,
            sortType: sortType,
            size: pageSize,
            page: page
        }))
    }, [sortType, pageSize, page])

    useEffect(() => {
        //fetch api get book recommend
        axios.get('http://localhost:3000/books', {
            params: filterParam
        })
        .then(function (response) {
            if(response.data.status == 200)
            {
                setBooks(response.data.data)
                setTotalItem(response.data.totalItem)
            }
        })
        .catch(function (error) {
            console.log(error);
          })
    }, [filterParam])
    
    const handleCategory = (category) => {
        setCategory(category)
    }
    const handleAuthor = (author) => {
        setAuthor(author)
    }
    const handleRating = (rating) => {
        setRating(rating)
    }
    const handleSort = (sortType) => {
        setSortType(sortType)
    }
    const handlePageSize = (size) => {
        setPageSize(size)
    }
    const handlePage = (page) => {
        setPage(page)
    }

    return (
        <div class='container' style={{marginTop: 50}}>
            <div class='shop'>
                <h3>Books</h3>
            </div>
            <hr></hr>
            <div>
                <Row>
                    <Col sm='2'>
                        <FilterBook filterTitle = {filterTitle} setFilterTitle = {setFilterTitle} onSelectCategory = {handleCategory} onSelectAuthor = {handleAuthor} onSelectRating = {handleRating}/>
                    </Col>
                    <Col>
                        <ShopContent sortType={sortType} pageSize={pageSize} totalItem={totalItem} page={page} listBook = {books} onSelectSort = {handleSort} onSelectPageSize = {handlePageSize} onSelectPage = {handlePage}/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
