import React, {useState, useEffect} from 'react'
import {Table} from 'reactstrap'
import axios from 'axios'
import getDataLogin from '../../utils/getDataLogin'

export default function TableTeachList() {
    const [teachList, setTeachList] = useState([])
    const userData = getDataLogin();
    useEffect(() => {
        if(userData.user)
        {
            axios.get(`http://localhost:5000/api/user/${userData.user.userid}/getListTeacherCourse`)
            .then(response => {
                if(response.status == 200)
                    setTeachList(response.data.courses)
            })
        }
    }, [])
    const renderEnrollList = (teachList) => {
        return teachList.map(item => {
            return (<tr>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.fullname}</td>
                <td>{item.imagepath}</td>
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

