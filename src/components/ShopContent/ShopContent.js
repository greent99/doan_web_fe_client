import {React, useState} from 'react'
import './ShopContent.css'
import '../../App.css'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap';
import BookCard from '../BookCard';
import Paginate from '../Paginate/Paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch  } from '@fortawesome/free-solid-svg-icons'

export default function ShopContent(props) {
    const [isOpenSort, setOpenSort] = useState(false);
    const toggle1 = () => setOpenSort(!isOpenSort);

    const [isOpenPaginate, setOpenPaginate] = useState(false);
    const toggle2 = () => setOpenPaginate(!isOpenPaginate);

    const listSort = [
        {
            title: 'Price Asc',
            value: 'priceAsc'
        },
        {
            title: 'Price Desc',
            value: 'priceDesc'
        }
    ]

    const listPaginate = [20, 15, 10, 5]
    const [key, setKey] = useState('')

    const renderlistCourses = (courses) => {
        return courses.map((item, index) => {
            return <Col sm="3">
                <BookCard item={item} key={index}></BookCard>
            </Col>
        })
    }

    const renderListSort = (listSort, props) => {
        return listSort.map(item => {
            return <DropdownItem onClick={() => {
                props.onSelectSort({title:item.title, value: item.value})
            }}>Sort by {item.title}</DropdownItem>
        })
    }

    const renderListPaginate = (listPaginate, props) => {
        return listPaginate.map(item => {
            return <DropdownItem onClick={() => {
                props.onSelectPageSize(item)
            }}>Show {item}</DropdownItem>
        })
    }
    const handleClickSearch = (props, key) => {
        props.handleSearch(key)
    }
    const handleChange = (e) => {
        setKey(e.target.value)
    }
    return (
        <div>
            <div class='shop-content-head'>
                <div class='text'>
                    <div class="input-group">
                        <input onChange={handleChange} type="text" class="form-control" placeholder="Search" />
                        <button onClick={() => handleClickSearch(props, key)} class="btn btn-secondary" type="button">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
                <div>
                    <ButtonDropdown isOpen={isOpenSort} toggle={toggle1} style={{marginRight: 10}}>
                        <DropdownToggle caret size="sm">
                            Sort by {props.sortType.title}
                        </DropdownToggle>
                        <DropdownMenu>
                            {renderListSort(listSort, props)}
                        </DropdownMenu>
                    </ButtonDropdown>

                    <ButtonDropdown isOpen={isOpenPaginate} toggle={toggle2}>
                        <DropdownToggle caret size="sm">
                            Show {props.pageSize}
                        </DropdownToggle>
                        <DropdownMenu>
                            {renderListPaginate(listPaginate,props)}
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
            </div>
            <div>
                <Row>
                    {renderlistCourses(props.listCourse)}
                </Row>
            </div>
            <div class='center-div'>
                <Paginate totalItem = {props.totalItem} pageSize = {props.pageSize} page = {props.page} onSelectPage = {props.onSelectPage}/>
            </div>
        </div>
           

    )
}
