import React, {useState, useEffect} from 'react'
import {Table} from 'reactstrap'
import axios from 'axios'
import getDataLogin from '../../utils/getDataLogin'

export default function TableEnrollList() {
    const [enrollList, setEnrollList] = useState([])
    const userData = getDataLogin();
    useEffect(() => {
        if(userData.user)
        {
            axios.get(`http://localhost:5000/api/user/${userData.user.userid}/getEnrollList`)
            .then(response => {
                if(response.status == 200)
                    setEnrollList(response.data.courses)
            })
        }
    }, [])
    const renderEnrollList = (watchList) => {
        return watchList.map(item => {
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
                    {renderEnrollList(enrollList)}
                </tbody>
            </Table>
        </div>
    )
}
