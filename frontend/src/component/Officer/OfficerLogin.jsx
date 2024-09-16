import React, { useState } from 'react'
import './OfficerLogin.css'
import { faEnvelope, faPerson } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BACKEND_URL } from '../Redux/constrant'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const OfficerLogin = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        password: '',
    })
    const { username, password } = data

    const loginsubmitHandle = () => {
        if (!username || !password) {
            alert("all field are required")
        }
        else {
            axios.post(`${BACKEND_URL}placement/login`, data)
                .then((res) => {
                    if (res.data) {
                        alert("login successfully")
                        localStorage.setItem("userId", JSON.stringify(res.data._id))
                        navigate('/officer/officerprofile')    
                    }
                    else {
                        alert("invalid password and username")
                        
                    }
                })
                .catch((e) => {
                    alert("invalid password and username")
                })
        }
    }
    return (
        <div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-sm-12 col-md-8 col-lg-6 col-xl-4">
                        <div class='card p-4'>
                            <center><h4>Placement Officer</h4></center>
                            <FontAwesomeIcon icon={faPerson} />
                            <div class="row g-3">
                                <div class="col-12">
                                    <label for="" class="form-label">Username</label>
                                    <input type="text"
                                        class="form-control"
                                        value={data?.username}
                                        onChange={(e) => setData({ ...data, username: e.target.value })}
                                    />
                                </div>
                                <div class="col-12">
                                    <label for="" class="form-label">Password</label>
                                    <input type="password"
                                        class="form-control"
                                        value={data?.password}
                                        onChange={(e) => setData({ ...data, password: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12">
                                    <button
                                        onClick={() => loginsubmitHandle()}
                                        class="btn btn-success"
                                    >Log in</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfficerLogin