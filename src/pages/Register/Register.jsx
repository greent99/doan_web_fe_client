/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Register.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Register() {
    const history = useHistory();
    const schema = yup.object().shape({
        email: yup.string().required(),
        username: yup.string().required(),
        password: yup.string().required(),
      });
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)});
    
    const onSubmit = async data => {
        console.log(data)
        await axios.post('http://localhost:5000/api/auth/register', data)
            .then(async response => {
                if(response.status === 201)
                {
                    await axios.post('http://localhost:5000/api/auth/login', {email: data.email, password: data.password})
                        .then(response => {
                            if(response.status === 200)
                            {
                                localStorage.setItem('userData', JSON.stringify(response.data))
                                history.push('/');
                            }
                        })
                        .catch(err => { console.log(err) })
                }
            })
            .catch(err => { console.log(err) })
    }
    return (
        <div class="login-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 class="text-center">Sign up</h2>       
                <div class="form-group">
                    <input type="email" class="form-control" placeholder="Email" {...register("email")} />
                    <p class='text-danger'>{errors.email?.message}</p>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password" {...register("password")} />
                    <p class='text-danger'>{errors.password?.message}</p>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Username" {...register("username")} />
                    <p class='text-danger'>{errors.username?.message}</p>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">Sign up</button>
                </div>
            </form>
            
        </div>
    )
}
