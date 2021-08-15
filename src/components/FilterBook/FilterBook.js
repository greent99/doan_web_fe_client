import {React, useEffect, useState} from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import './FilterBook.css'
const axios = require('axios')

export default function FilterBook(props) {
    const [categories, setCategories] = useState([])
    const [authors, setAuthors] = useState([])
    const stars = [1, 2, 3, 4, 5]
    useEffect(() => {
        axios.get('http://localhost:3000/categories')
        .then(function (response) {
            if(response.data.status == 200)
            {
                setCategories(response.data.data)
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
          })

        axios.get('http://localhost:3000/authors')
        .then(function (response) {
            if(response.data.status == 200)
            {
                setAuthors(response.data.data)
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
                props.setFilterTitle(`Category ${item.category_name}`)
            }} key={item.id}>{item.category_name}</ListGroupItem>
        })
    }
    
    const renderListAuthor = (arr, props) => {
        return arr.map((item) => {
            return <ListGroupItem tag='a' onClick={() => {
                props.onSelectAuthor(item.id)
                props.setFilterTitle(`Author ${item.author_name}`)
            }} key={item.id}>{item.author_name}</ListGroupItem>
        })
    }

    const renderListRating = (arr, props) => {
        return arr.map((item) => {
            return <ListGroupItem tag='a' onClick={() => {
                props.onSelectRating(item)
            }} key={item}>{item} star</ListGroupItem>
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
                    {renderListCategory(categories, props)}
                </ListGroup>
            </div>
            <div style={{width: '100%', marginTop: 40}}>
                <h5>Author</h5>
                <ListGroup>
                    {renderListAuthor(authors, props)}
                </ListGroup>
            </div>
            <div style={{width: '100%', marginTop: 40}}>
                <h5>Rating Review</h5>
                <ListGroup>
                    {renderListRating(stars, props)}
                </ListGroup>
            </div>
        </div>
    )
}
