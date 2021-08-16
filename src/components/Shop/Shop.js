import {React, useState, useEffect} from 'react'
import './Shop.css'
import '../../index.css'
import { Row, Col } from 'reactstrap'
import FilterBook from '../FilterBook/FilterBook'
import ShopContent from '../ShopContent/ShopContent'
const axios = require('axios')

export default function Shop() {
    const [sortType, setSortType] = useState('onSale')
    const [pageSize, setPageSize] = useState(20)
    const [page, setPage] = useState(1)
    const [totalItem, setTotalItem] = useState(0)
    const [courses, setCourses] = useState([])
    const [filterParam, setFilterParam] = useState({})
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
        axios.get('http://localhost:5000/api/courses', {
            // params: {
            //     page, pageSize, sortType
            // }
        })
        .then(function (response) {
            if(response.data.status === 200)
            {
                setCourses(response.data.dataRows)
                setTotalItem(response.data.totalItems)
            }
        })
        .catch(function (error) {
            console.log(error);
          })
    }, [filterParam])
    
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
                    {/* <Col sm='2'>
                        <FilterBook filterTitle = {filterTitle} setFilterTitle = {setFilterTitle} onSelectCategory = {handleCategory} onSelectAuthor = {handleAuthor} onSelectRating = {handleRating}/>
                    </Col> */}
                    <Col>
                        <ShopContent sortType={sortType} pageSize={pageSize} totalItem={totalItem} page={page} listCourse = {courses} onSelectSort = {handleSort} onSelectPageSize = {handlePageSize} onSelectPage = {handlePage}/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
