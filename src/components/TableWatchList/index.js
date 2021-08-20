import React, {useState, useEffect} from 'react'
import {Table} from 'reactstrap'
import axios from 'axios'
import getDataLogin from '../../utils/getDataLogin'

export default function TableWatchList() {
    const [watchList, setWatchList] = useState([])
    const userData = getDataLogin();
    useEffect(() => {
        if(userData.user)
        {
            axios.get(`http://localhost:5000/api/user/${userData.user.userid}/getWatchList`)
            .then(response => {
                if(response.status == 200)
                    setWatchList(response.data.courses)
            })
        }
    }, [])
    const renderWatchList = (watchList) => {
        
        return watchList.map(item => {
            const img_url = `http://localhost:5000${item.imgpath}`
            return (<tr>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.fullname}</td>
                <td>
                    <img height="50px" src={img_url} />
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
                    {renderWatchList(watchList)}
                </tbody>
            </Table>
        </div>
    )
}
