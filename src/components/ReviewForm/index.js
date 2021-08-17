import React from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useForm } from "react-hook-form";
import getDataLogin from '../../utils/getDataLogin';
const axios = require('axios')


export default function ReviewForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            rating_start: 1
        }
    });
    const dataLogin = getDataLogin()
    const history = useHistory();
    let { id } = useParams();
    console.log(localStorage.getItem('userData'))
    const onSubmit = function(data){
        data.userid = dataLogin.user.userid
        axios.post(`http://localhost:5000/api/courses/${id}/addReview`, data)
        .then(function (response) {
            if(response.status == 200)
            {
                window.location.reload()
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            })
    }
    return (
        <div class='border' class='d-flex flex-column'>
            <div class='d-flex justify-content-start'>
                <h5>Write a review</h5>
            </div>
            <hr></hr>
            <div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup style={{marginTop: 20}}>
                        <div class='d-flex justify-content-start'>
                            <Label for="exampleText">Comment</Label>
                        </div>
                        <Input type="textarea" {...register("comment")} id="comment" />
                    </FormGroup>
                    <FormGroup style={{marginTop: 30}}>
                        <div class='d-flex justify-content-start'>
                            <Label for="star">Select</Label>
                        </div>
                        <Input type="select" {...register("point")} id="point">
                            <option value='1'>1 Star</option>
                            <option value='2'>2 Star</option>
                            <option value='3'>3 Star</option>
                            <option value='4'>4 Star</option>
                            <option value='5'>5 Star</option>
                        </Input>
                    </FormGroup>
                    {dataLogin ? <Button style={{marginTop: 10}} type="submit">Submit</Button>
                    : <Button 
                        style={{marginTop: 10}} 
                        type="button"
                        onClick={() => {
                            history.push('/login')
                        }}
                        >
                        Submit
                    </Button>
                    }
                    
                </Form>
            </div>
        </div>
    )
}
