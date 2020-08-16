import Layout from "../../components/Layout/Layout";
import style from '../../public/Form.module.scss';
import axiosInstance from '../../instances/axios/axiosInstance';

import React, {Component} from 'react';

const getObjectFromFormData = (formData) => {
    let object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    return object;
}

const formSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(document.querySelector('form'))
    const promise = await axiosInstance.post("/api/login", getObjectFromFormData(formData))
    const data = await promise.data.data
    if(data["auth_token"] !== undefined) {
        let expireDate = new Date()
        expireDate.setDate(expireDate.getDate() + 1)
        document.cookie += `token=${data["auth_token"]};expires=${expireDate.toUTCString()}`
        window.location.href="/";
    }
}

class Login extends Component {

    render() {
        return (
            <Layout>
                <div className={style.container}>
                    <form onSubmit={formSubmit}>
                        <div>
                            <label htmlFor="">Username</label>
                            <input id="username" type="text" name="username"/>
                        </div>
                        <div>
                            <label htmlFor="">Password</label>
                            <input id="password" type="password" name="password"/>
                        </div>
                        <div>
                            <div/>
                            <input type="submit" value="Login"/>
                        </div>
                    </form>
                </div>
            </Layout>
        );
    }
}

export default Login;

