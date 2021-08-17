/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Login.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Login() {
    const history = useHistory();
    const schema = yup.object().shape({
        email: yup.string().required(),
        password: yup.string().required(),
      });
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)});
    
    const onSubmit = async data => {
        console.log(data)
        await axios.post('http://localhost:5000/api/auth/login', data)
            .then(response => {
                if(response.status === 200)
                {
                    localStorage.setItem('userData', JSON.stringify(response.data))
                    history.goBack();
                }
            })
            .catch(err => { console.log(err) })
    }
    return (
        <div class="login-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 class="text-center">Log in</h2>       
                <div class="form-group">
                    <input type="email" class="form-control" placeholder="Email" {...register("email")} />
                    <p class='text-danger'>{errors.email?.message}</p>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password" {...register("password")} />
                    <p class='text-danger'>{errors.password?.message}</p>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">Log in</button>
                </div>
            </form>
            <p class="text-center"><a href="/register">Create an Account</a></p>
        </div>
    )
}
