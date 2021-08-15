import React from 'react'
import { useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useForm } from "react-hook-form";
const axios = require('axios')


export default function ReviewForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            rating_start: 1
        }
    });
    let { id } = useParams();
    const onSubmit = function(data){
        data.rating_start = +data.rating_start
        console.log(data.rating_start)
        axios.post(`http://localhost:3000/books/${id}/addReview`, data)
        .then(function (response) {
            if(response.data.status == 200)
            {
                console.log('Add review success')
                window.location.reload()
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            })
    }


    return (
        <div class='border' class='d-flex flex-column '>
            <div class='d-flex justify-content-start'>
                <h5>Write a review</h5>
            </div>
            <hr></hr>
            <div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <div class='d-flex justify-content-start'>
                            




                            
                        </div>
                        <Input type="text" {...register("review_title", {required: true})} id="title" />
                        {errors.review_title && <p class='text-danger'>This field is required</p>}
                    </FormGroup>
                    <FormGroup style={{marginTop: 20}}>
                        <div class='d-flex justify-content-start'>
                            <Label for="exampleText">Details please! Your review helps orther shoppers.</Label>
                        </div>
                        <Input type="textarea" {...register("review_details")} id="detail" />
                    </FormGroup>
                    <FormGroup style={{marginTop: 30}}>
                        <div class='d-flex justify-content-start'>
                            <Label for="star">Select</Label>
                        </div>
                        <Input type="select" {...register("rating_start")} id="star">
                            <option value='1'>1 Star</option>
                            <option value='2'>2 Star</option>
                            <option value='3'>3 Star</option>
                            <option value='4'>4 Star</option>
                            <option value='5'>5 Star</option>
                        </Input>
                    </FormGroup>
                    <Button style={{marginTop: 10}} type="submit">Submit</Button>
                </Form>
            </div>
        </div>
    )
}
