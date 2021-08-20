import {React, useContext, useEffect, useState} from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Table} from 'reactstrap'
import './Cart.css'
import TableWatchList from '../TableWatchList/index'
import TableEnrollList from '../TableEnrollList'
import getDataLogin from '../../utils/getDataLogin'
import TableTeachList from '../TableTeachList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus  } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom'
const axios = require('axios')

export default function Cart() {
    const validationSchema = yup.object().shape({
        name: yup.string()
          .required('Name is a required Input')
          .max(255)
          .test('name', 'Name do not include spaces!', (value) => {
            if (value) {
              return !value.includes(' ');
            }
            return true;
          }),
        author: yup.number().required('Author is a required Input'),
        description: yup.string(),
        status: yup.string().required('Status is a required Input').max(255),
        price: yup.number().required('Price is a required Input').min(0),
      });
      const { register, handleSubmit, getValues, formState:{ errors } } = useForm({
        resolver: yupResolver(validationSchema)
      });

    const dataLogin = getDataLogin()
    const history = useHistory()

    const [modal, setModal] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [listAuthor, setListAuthor] = useState([]);
    const [addCourseSuccess, setAddCourseSuccess] = useState(false)
    const [courseId, setCourseId] = useState()

    const toggle = () => setModal(!modal);

    useEffect(() => {
        axios.get('http://localhost:5000/api/fields').then((response) => {
          if (response.status === 200) setListCategory(response.data.dataRows);
        });
      }, []);
      useEffect(() => {
        axios.get('http://localhost:5000/api/user/getByRole/Teacher').then((response) => {
          if (response.status === 200) setListAuthor(response.data.users);
        });
      }, []);

    const renderListCategory = (categories) =>
        categories.map((category) => <option value={category.id}>{category.name}</option>);
    const renderListAuthor = (authors) =>
        authors.map((author) => <option value={author.id}>{author.fullname}</option>);

    const onSubmit = async (values) => {
        console.log('?')
        const files = getValues('file')
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('name', getValues('name'));
        formData.append('author', getValues('author'));
        formData.append('fieldid', getValues('field'));
        formData.append('price', getValues('price'));
        formData.append('description', getValues('description'));
        formData.append('status', getValues('status'));
        await axios.post(`http://localhost:5000/api/courses`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            if(response.status == 200)
            {
                setAddCourseSuccess(true)
                setModal(!modal)
            }
        })
    }

    const handleLesson = (courseId) => {
        setCourseId(courseId)
    }

    const [modalLesson, setModalLesson] = useState(false);

    return (
            <div class='container' style={{marginTop: 50}}>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Add Course</ModalHeader>
                    <ModalBody>
                        <Form id="add-course-form" >
                            <FormGroup as={Row} className="mb-3">
                                <Label htmlFor="name" column sm="3">
                                    Name<sup className="required-icon">*</sup>
                                </Label>
                                <Col sm="9">
                                    <Input id="name" {...register("name")} className="form-control" />
                                    <p>{errors.name?.message}</p>
                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} className="mb-3">
                                <Label htmlFor="author" column sm="3">
                                    Author<sup className="required-icon">*</sup>
                                </Label>
                                <Col sm="9">
                                <select class="form-select" {...register("author")}>
                                    {renderListAuthor(listAuthor)}
                                    </select>
                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} className="mb-3">
                                <Label htmlFor="Input" column sm="3">
                                    Category<sup className="required-icon">*</sup>
                                </Label>
                                <Col sm="9">
                                    <select class="form-select" {...register("field")}>
                                        {renderListCategory(listCategory)}
                                    </select>
                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} className="mb-3">
                                <Label htmlFor="price" column sm="3">
                                    Price<sup className="required-icon">*</sup>
                                </Label>
                                <Col sm="9">
                                    <Input id="price" {...register("price")} className="form-control" />
                                    <p>{errors.price?.message}</p>
                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} className="mb-3">
                                <Label htmlFor="description" column sm="3">
                                    Description<sup className="required-icon">*</sup>
                                </Label>
                                <Col sm="9">
                                    <Input
                                    id="description"
                                    {...register("description")}
                                    placeholder=""
                                    className="form-control"
                                    />
                                    <p>{errors.description?.message}</p>
                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} className="mb-3">
                                <Label htmlFor="description" column sm="3">
                                    Avatar<sup className="required-icon">*</sup>
                                </Label>
                                <Col sm="9">
                                    <input id="file" {...register("file")} type="file"
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} className="mb-3">
                                <Label htmlFor="status" column sm="3" className="mt-1">
                                    Status<sup className="required-icon">*</sup>
                                </Label>
                                <Col sm="9">
                                    <Row className="mt-2">
                                        <div className="form-check">
                                            <Input type="radio" id="female-gender" {...register("status")} value="Available" />
                                            <Label htmlFor="female-gender" className="ml-3 mt-1">
                                                Available
                                            </Label>
                                        </div>

                                        <div className="form-check">
                                            <Input type="radio" id="male-gender" {...register("status")} value="Not Available" />
                                            <Label htmlFor="male-gender" className="ml-3 mt-1">
                                            Not Available
                                            </Label>
                                        </div>
                                        <p>{errors.status?.message}</p>
                                    </Row>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                    <Button onClick={onSubmit} color="primary" type="submit" >Add</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <div class="d-flex justify-content-end">
                    <Button onClick={() => {
                        localStorage.removeItem('userData')
                        history.push('/login')
                    }}>Logout</Button>
                </div>
                <hr></hr>
                <div>
                    {dataLogin.user && dataLogin.user.userType == 'Student' ?
                    <div>
                        <div class="d-flex jusfity-content-start">
                            <h5>Your watch list</h5>
                        </div>
                        <Row>
                            <TableWatchList />
                        </Row>

                        <div class="d-flex jusfity-content-start">
                            <h5>Your Enroll list</h5>
                        </div>
                        <Row>
                            <TableEnrollList />
                        </Row>
                    </div>
                    : <></>
                    }

                    { dataLogin.user && dataLogin.user.userType == 'Teacher' ?
                        <div>
                            <div class="d-flex justify-content-between" style={{marginBottom: '10px'}}>
                                <h5>Course Manager</h5>
                                <Button onClick={toggle}>
                                    <FontAwesomeIcon icon={faPlus} /> Add Course
                                </Button>
                            </div>
                            <Row>
                                <TableTeachList handleLesson = {handleLesson}  addCourseSuccess = {addCourseSuccess}/>
                            </Row>
                        </div>
                        : <></>
                    }

                    {
                        dataLogin.user && dataLogin.user.userType == 'Admin' ? <h5>Profile for Admin will coming soon...</h5> : <></>
                    }
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
    )
}
