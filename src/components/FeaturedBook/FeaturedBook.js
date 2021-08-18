import React from 'react'
import { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import BookCard from '../BookCard'
import './FeaturedBook.css'
const axios = require('axios');

export default function FeaturedBook() {
    const [bookRecommend, setbookRecommend] = useState([])
    const [bookPopular, setbookPopular] = useState([])
    useEffect(() => {
        //fetch api get book recommend
        axios.get('http://localhost:5000/api/courses/getTopNewest')
        .then(function (response) {
            if(response.status == 200)
            {
                setbookRecommend(response.data.dataRows)
            }
        })
        .catch(function (error) {
            console.log(error);
          })

        axios.get('http://localhost:5000/api/courses/getTopPopular')
        .then(function (response) {
            if(response.status == 200)
            {
                setbookPopular(response.data.dataRows)
            }
        })
        .catch(function (error) {
            console.log(error);
          })
    }, [])

    const renderlistBook = (books) => {
        return books.map((item, index) => {
            return <Col sm="3">
                <BookCard item={item} key={index}></BookCard>
            </Col>
        })
    }

    const [activeTab, setActiveTab] = useState('1')

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div class='list-featured-book'>
            <h3>Featured Courses</h3>
            <div class="center" id='tab-featured-book'>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Newest
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Popular
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
            <div>
                <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                {renderlistBook(bookRecommend)}
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                {renderlistBook(bookPopular)}
                            </Row>
                        </TabPane>
                    </TabContent>
            </div>
        </div>
    )
}

