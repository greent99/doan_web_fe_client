import React, {useState, useEffect} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faThermometerFull, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios'
import { useParams } from 'react-router-dom';

export default function ManageLesson() {
    const [listLesson, setListLesson] = useState([])
    const {id} = useParams()
    const [modal, setModal] = useState(false);
    const [addLessonSuccess, setAddLessonSuccess] = useState(false)

    const toggle = () => setModal(!modal);
    const schema = yup.object().shape({
        title: yup.string().required(),
        videourl: yup.string().required(),
      });

    const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
    });
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}/lessons`)
        .then(response => {
            if(response.status == 200)
            {
                setListLesson(response.data.lessons)
            }
        })
    }, [addLessonSuccess])

    const renderListLesson = (lessons) => {
        return lessons.map(item => {
            return <tr>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.videourl}</td>
                <td>
                    <Button style={{marginRight: '5px'}}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                </td>
            </tr>
        })
    }
    const onSubmit = data => {
        axios.post(`http://localhost:5000/api/courses/${id}/addLesson`, data)
        .then(response => {
            if(response.status == 200)
            {
                setAddLessonSuccess(true)
                setModal(!modal);
            }
        })
    }

    return (
        <div class='container' style={{marginTop: 50}}>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                <form id="add_lesson_form" onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <FormGroup style={{marginTop: 20}}>
                        <div class='d-flex justify-content-start'>
                            <Label for="exampleText">Title</Label>
                        </div>
                        <Input type="text" {...register("title")} id="title" />
                        <p class="text-danger">{errors.title?.message}</p>
                    </FormGroup>
                    
                    
                    <FormGroup style={{marginTop: 20}}>
                        <div class='d-flex justify-content-start'>
                            <Label for="exampleText">Description</Label>
                        </div>
                        <Input type="textarea" {...register("description")} id="description" />
                    </FormGroup>

                    <FormGroup style={{marginTop: 20}}>
                        <div class='d-flex justify-content-start'>
                            <Label for="exampleText">Video Url</Label>
                        </div>
                        <Input type="text" {...register("videourl")} id="description" />
                        <p class="text-danger">{errors.videoUrl?.message}</p>
                    </FormGroup>
                    
                </form>
                </ModalBody>
                <ModalFooter>
                <Button form='add_lesson_form' color="primary" type="submit">Add Lesson</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <hr></hr>
            <div class="row" style={{marginBottom: '10px'}}>
                <div class="d-flex justify-content-between">
                    <h5>Manage Lesson</h5>
                    <Button onClick={toggle}>
                        <FontAwesomeIcon icon={faPlus} /> Add Lesson
                    </Button>
                </div>
            </div>
            <div class="row">
                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Video Url</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderListLesson(listLesson)}
                    </tbody>
                </Table>
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
            <br/>
            <br/>
            <br/>
        </div>
    )
}
