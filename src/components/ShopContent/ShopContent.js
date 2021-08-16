import {React, useState} from 'react'
import './ShopContent.css'
import '../../App.css'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap';
import BookCard from '../BookCard';
import Paginate from '../Paginate/Paginate';

export default function ShopContent(props) {

    const [isOpenSort, setOpenSort] = useState(false);
    const toggle1 = () => setOpenSort(!isOpenSort);

    const [isOpenPaginate, setOpenPaginate] = useState(false);
    const toggle2 = () => setOpenPaginate(!isOpenPaginate);

    const listSort = [
        'onSale', 'popular', 'priceAsc', 'priceDesc'
    ]

    const listPaginate = [20, 15, 10, 5]

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
                props.onSelectSort(item)
            }}>Sort by {item}</DropdownItem>
        })
    }

    const renderListPaginate = (listPaginate, props) => {
        return listPaginate.map(item => {
            return <DropdownItem onClick={() => {
                props.onSelectPageSize(item)
            }}>Show {item}</DropdownItem>
        })
    }

    const index = (props.page - 1) * props.pageSize + 1

    return (
        <div>
            <div class='shop-content-head'>
                <div class='text'>
                    <p >Showing {index}-{index + props.pageSize - 1} of {props.totalItem} books</p>
                </div>
                <div>
                    <ButtonDropdown isOpen={isOpenSort} toggle={toggle1} style={{marginRight: 10}}>
                        <DropdownToggle caret size="sm">
                            Sort by {props.sortType}
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
