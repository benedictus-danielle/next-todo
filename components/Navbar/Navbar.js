import style from './Navbar.module.scss'
import Link from "next/link"
import React, {Component} from 'react';
import axiosInstance from "../../instances/axios/axiosInstance";

const getCookieValue = (name) => {
    const cookies = document.cookie.split(';');
    for(let i = 0;i<cookies.length;i++){
        let c = cookies[i].split('=');
        if(c[0].trim() === name){
            return c[1];
        }
    }
    return "";
}

const checkTokenStatus = () => {
    const token = getCookieValue('token');
    if (token !== "") {
        return axiosInstance.post("/api/token/verify", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            const data = res.data.data
            if(data){
                return true;
            }
        })
    }
    return new Promise(() => {return false});
}

class Navbar extends Component {
    state = {loggedIn: false}
    componentDidMount() {
        checkTokenStatus().then(res => {
            this.setState({loggedIn:res})
        })
    }

    render() {

        return (
            <div className={style.navbar}>
                <div>
                    <Link href="/">
                        <a>
                            Home
                        </a>
                    </Link>
                </div>

                {
                    !this.state.loggedIn ?
                        <div>
                            <div>
                                <Link href="/login">
                                    <a>
                                        Login
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <Link href="/register">
                                    <a>
                                        Register
                                    </a>
                                </Link>
                            </div>
                        </div>
                        :
                        <div/>
                }
            </div>
        );
    }
}

export default Navbar;