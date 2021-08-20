import {React, useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router'
import './BookDetail.css'
import '../../index.css'
import { Col, Row, Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle } from 'reactstrap'
import BookDetailTitle from '../BookDetailTitle/BookDetailTitle'
import ReviewCustomer from '../ReviewCustomer'
import ReviewForm from '../ReviewForm'
import { CartContext } from '../../context/CartContext'
import { useHistory } from 'react-router-dom'
import { createToast } from '../../utils/createToast'
import getDataLogin from '../../utils/getDataLogin'
import { ToastContainer, toast } from 'react-toastify';
import ListLessonInDetail from '../ListLessonInDetail'
const axios = require('axios')

export default function BookDetail() {
    let { id } = useParams();
    const [course, setCourse] = useState({
        author: { author_name: '' }
    })
    const [isLogin, setIsLogin] = useState(false)
    const history = useHistory();
    useEffect(() => {
        // get course detail
        axios.post(`http://localhost:5000/api/courses/${id}/increaseView`)
        .catch(err => {
            throw(err)
        })
        axios.get(`http://localhost:5000/api/courses/${id}`)
        .then((response) => {
            console.log(response.status)
            if(response.status == 200)
            {
                setCourse(response.data.course)
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
          })
    }, [])
    const userData = getDataLogin()
    
    useEffect(() => {
        if(localStorage.getItem('userData'))
            setIsLogin(true)
    }, [])

    const addToWatchList = (courseid) => {
        axios.post(`http://localhost:5000/api/courses/${courseid}/addToWatchList`, {
            userid: userData.user.userid
        })
        .then((response) => {
            console.log(response.status)
            if(response.status == 200)
            {
                alert('Add Success')
            }
        })
        .catch(function (error) {
            console.log(error);
          })
    }

    const enrollCourse = (courseid) => {
        axios.post(`http://localhost:5000/api/user/${userData.user.userid}/enrollCourse`, {
            courseid
        })
        .then((response) => {
            console.log(response.status)
            if(response.status == 200)
            {
                alert('Enroll Success')
            }
        })
        .catch(function (error) {
            if(error.response)
                alert(error.response.data.message)
          })
    }

    const [checkInCourse, setCheckInCourse] = useState(false)
    useEffect(() => {
    
        if(userData) {
            axios.post(`http://localhost:5000/api/courses/${id}/checkUserInCourse`, {
                userid: userData.user.userid
            })
            .then((response) => {
                if(response.status == 200)
                    setCheckInCourse(response.data.status)
            })
        }
    })

    return (
        <div>
        <ToastContainer />
            <div class='container' style={{marginTop: 50}}>
                <div class='d-flex justify-content-start'>
                    <h3>Category Name</h3>
                </div>
                <hr></hr>
                <div>
                    <Row>
                        <Col sm='8'>
                            <BookDetailTitle course = {course} />
                        </Col>
                            <Col>
                                <Card class='card-body'>
                                    <CardHeader>{course.price}đ</CardHeader>
                                    <CardBody class='d-flex flex-column justify-content-center'>
                                        <div class="row justify-content-center">
                                            {isLogin ? <Button 
                                                style={{width: '75%', marginTop: 10}} 
                                                onClick = {() => enrollCourse(course.id)}
                                                size='lg'>
                                                Eroll
                                            </Button> 
                                            : <Button 
                                                style={{width: '75%', marginTop: 10}} 
                                                onClick = {() => {
                                                    history.push('/login')
                                                }}
                                                size='lg'>
                                                Eroll
                                            </Button>
                                            }
                                        </div>

                                        <div class="row justify-content-center">
                                        {isLogin ? <Button 
                                            style={{width: '75%', marginTop: 10, marginBottom: 10}} 
                                            onClick = {() => addToWatchList(course.id)}
                                            size='sm'>
                                            Add to Watchlist
                                        </Button> 
                                        : <Button 
                                            style={{width: '75%', marginTop: 10, marginBottom: 10}} 
                                            onClick = {() => {
                                                history.push('/login')
                                            }}
                                            size='sm'>
                                            Add to Watchlist
                                        </Button>
                                        }
                                        </div>
                                        
                                    </CardBody>
                                    <CardFooter>Course Academy</CardFooter>
                                </Card>
                            </Col>
                    </Row>
                </div>
                <div style={{marginTop: 50, marginBottom: 50}}>
                    <Row>
                        <Col sm='8'>
                            {checkInCourse ? (
                                <div style={{marginBottom: '50px'}}>
                                    <div style={{marginBottom: '10px'}} class="d-flex justify-content-start">
                                        <h5>List Lesson</h5>
                                    </div>
                                    <ListLessonInDetail />
                                </div>
                            )
                            : <></>
                            }
                            <ReviewCustomer book = {course}/>
                        </Col>
                        <Col>
                        {userData && checkInCourse ? <ReviewForm /> : <></>}
                        </Col>
                    </Row>
                </div>
            </div>
            </div>
    )
}
