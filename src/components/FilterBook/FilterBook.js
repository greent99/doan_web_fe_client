import {React, useEffect, useState} from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import './FilterBook.css'
const axios = require('axios')

export default function FilterBook(props) {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/api/fields')
        .then(function (response) {
            if(response.status === 200)
            {
                setCategories(response.data.dataRows)
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
          })
    }, [])
    
    const renderListCategory = (arr, props) => {
        return arr.map((item) => {
            return <ListGroupItem tag='a' onClick={() => {
                props.onSelectCategory(item.id)
                props.setFilterTitle(`Category ${item.name}`)
            }} key={item.id}>{item.name}</ListGroupItem>
        })
    }
    
    return (
        <div class='filter'>
            <div>
                <h6 class='text-primary'>Filter By {props.filterTitle}</h6>
            </div>
            <div style={{width: '100%'}}>
               <h5>Category</h5>
                <ListGroup >
                <ListGroupItem tag='a' onClick={() => {
                        props.onSelectCategory('all')
                        props.setFilterTitle(`All Category`)
                    }} key={0}>All</ListGroupItem>
                    {renderListCategory(categories, props)}
                </ListGroup>
            </div>
        </div>
    )
}
