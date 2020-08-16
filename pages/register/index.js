
import Layout from "../../components/Layout/Layout";
import style from '../../public/Form.module.scss';
import axiosInstance from "../../instances/axios/axiosInstance";
import {Redirect} from "next/dist/lib/load-custom-routes";

const getObjectFromFormData = (formData) => {
    let object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    return object;
}

import React, {Component} from 'react';

class Register extends Component {
    state = { redirect: null };
    render() {
        const formSubmit = (e) => {
            e.preventDefault()
            const data = getObjectFromFormData(new FormData(document.querySelector('form')))
            axiosInstance.post("/api/register",data)
                .then(res => {
                    if(res.data.status === "success"){
                        this.setState({ redirect: "/login" })
                    }
                })

        }
        if(this.state.redirect){
            return (<Redirect to={this.state.redirect} />)
        }
        return (
            <Layout>
                <div className={style.container}>
                    <form onSubmit={formSubmit}>
                        <div>
                            <label htmlFor="">Username</label>
                            <input type="text" name="username"/>
                        </div>
                        <div>
                            <label htmlFor="">Password</label>
                            <input type="text" name="password"/>
                        </div>
                        <div>
                            <label htmlFor="">Confirmation Password</label>
                            <input type="text" name="confirmation_password"/>
                        </div>
                        <div>
                            <label htmlFor=""/>
                            <input type="submit" value="Register"/>
                        </div>
                    </form>
                </div>
            </Layout>
        );
    }
}

export default Register;
