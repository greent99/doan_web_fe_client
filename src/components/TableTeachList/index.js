import React, {useState, useEffect} from 'react'
import {Table, Button} from 'reactstrap'
import axios from 'axios'
import getDataLogin from '../../utils/getDataLogin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function TableTeachList(props) {
    const [teachList, setTeachList] = useState([])
    const userData = getDataLogin();
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    useEffect(() => {
        if(userData.user)
        {
            axios.get(`http://localhost:5000/api/user/${userData.user.userid}/getListTeacherCourse`)
            .then(response => {
                if(response.status == 200)
                {
                    setTeachList(response.data.courses)
                    setDeleteSuccess(false)
                }
            })
        }
    }, [props.addCourseSuccess, deleteSuccess])

    const renderEnrollList = (teachList) => {
        return teachList.map(item => {
            const img_url = `http://localhost:5000${item.imgpath}`
            return (<tr>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.fullname}</td>
                <td>
                    <img height="50px" src={img_url} />
                </td>
                <td>
                    <Button style={{marginRight: "10px"}} onClick={() => {
                        window.location=`/courses/${item.id}/lesson`
                    }}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </Button>
                    <Button onClick={() => {
                        axios.delete(`http://localhost:5000/api/courses/${item.id}/deleteOfTeacher?userid=${userData.user.userid}`)
                        .then(response => {
                            if(response.status == 200)
                                setDeleteSuccess(true)
                        })
                    }}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </Button>
                </td>
            </tr>)
        })
    } 
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Author</th>
                    <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {renderEnrollList(teachList)}
                </tbody>
            </Table>
        </div>
    )
}

