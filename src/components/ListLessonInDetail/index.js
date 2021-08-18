import React, {useState, useEffect} from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios'
import { useParams } from 'react-router-dom';

export default function ListLessonInDetail() {
    const [listLesson, setListLesson] = useState([])
    const {id} = useParams()
    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}/lessons`)
        .then(response => {
            if(response.status == 200)
                setListLesson(response.data.lessons)
        })
    }, [])

    const renderListLesson = (lessons) => {
        return lessons.map(item => 
            <ListGroupItem>
                    <div class="d-flex justify-content-start">
                        <a href={item.videourl}>{item.title}</a>
                    </div>
                    <div class="d-flex justify-content-start">
                        <p style={{color: 'black'}}>{item.description}</p>
                    </div>
                
            </ListGroupItem>
        )
    }
    return (
        <div>
            <ListGroup>
                {renderListLesson(listLesson)}
            </ListGroup>
        </div>
    )
}
