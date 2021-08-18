import {React, useState, useEffect} from 'react'
import './Shop.css'
import '../../index.css'
import { Row, Col } from 'reactstrap'
import FilterBook from '../FilterBook/FilterBook'
import ShopContent from '../ShopContent/ShopContent'
const axios = require('axios')

export default function Shop() {
    const [sortType, setSortType] = useState({title: 'Price Asc', value: 'priceAsc'})
    const [pageSize, setPageSize] = useState(20)
    const [page, setPage] = useState(1)
    const [totalItem, setTotalItem] = useState(0)
    const [courses, setCourses] = useState([])
    const [category, setCategory] = useState();
    const [keySearch, setKeySearch] = useState()
    const [filterTitle, setFilterTitle] = useState('')

    useEffect(() => {
        //fetch api get book recommend
        axios.get('http://localhost:5000/api/courses', {
            params: {
                page, pageSize, category, keySearch,
                sortType: sortType.value
            }
        })
        .then(response => {
            if(response.status === 200)
            {
                console.log(response.data.dataRows)
                setCourses(response.data.dataRows)
                setTotalItem(response.data.totalItems)
                
            }
        })
        .catch(function (error) {
            console.log(error);
          })
    }, [sortType, page, pageSize, category, keySearch])
    
    const handleSort = (sortType) => {
        setSortType(sortType)
    }
    const handlePageSize = (size) => {
        setPageSize(size)
    }
    const handlePage = (page) => {
        setPage(page)
    }
    const handleCategory = (category) => {
        setCategory(category)
    }
    const handleSearch = (key) => {
        setKeySearch(key)
    }
    
    return (
        <div class='container' style={{marginTop: 50}}>
            <div class='shop'>
                <h3>Courses</h3>
            </div>
            <hr></hr>
            <div>
                <Row>
                    <Col sm='2'>
                        <FilterBook filterTitle = {filterTitle} setFilterTitle = {setFilterTitle}  onSelectCategory = {handleCategory}/>
                    </Col>
                    <Col>
                        <ShopContent handleSearch = {handleSearch} sortType={sortType} pageSize={pageSize} totalItem={totalItem} page={page} listCourse = {courses} onSelectSort = {handleSort} onSelectPageSize = {handlePageSize} onSelectPage = {handlePage}/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
