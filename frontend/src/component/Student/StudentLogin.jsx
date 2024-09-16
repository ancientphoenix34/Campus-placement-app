import React, { useState, useEffect } from 'react'
import './StudentLogin.css'
import { faEnvelope, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, receiveUserDetails } from '../Redux/Actions/authAction'
import { BACKEND_URL } from '../Redux/constrant'
import axios from 'axios'

const StudentLogin = (props) => {
    useEffect(()=>{
        localStorage.clear()
    },[])
    const
        {
            login,
            setUser
        } = props
    const [values, setValues] = useState({
        username: "",
        pswd: ""
    });
    const navigate = useNavigate()

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const validation = (values) => {
        let errors = {};

        if (!values.username.trim()) {
            errors.username = "username is required"
        }

        if (!values.pswd.trim()) {
            errors.password = "password is required"
        }

        return errors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        if (!(Object.keys(validation(values)).length)) {
            console.log("Called");
            axios.post(`${BACKEND_URL}student/login`, values)
                .then((res) => {
                    if (res.data) {
                        login()
                        setUser(res.data)
                        localStorage.setItem("userId",res.data._id)
                        navigate("/student/studentprofile");
                    }
                })
                .catch((err) => {
                    alert("Error in Login", err);
                })
        }
    };
    return (
        <div>
            <form>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-12 col-md-8 col-lg-6 col-xl-4">
                            <div class='card p-4'>
                                <center><h4>Student Portal</h4></center>
                                <FontAwesomeIcon icon={faGraduationCap} />
                                <div class="row g-3">
                                    <div class="col-12">
                                        <label for="" class="form-label">Username/Admn No</label>
                                        <input type="text" class="form-control" onChange={handleChange} name='username' value={values.username} />
                                        {errors.username && <p style={{ color: "red", fontSize: "13px" }}>{errors.username}</p>}
                                    </div>
                                    <div class="col-12">
                                        <label for="" class="form-label">Password</label>
                                        <input type="password" className="form-control" onChange={handleChange} name='pswd' value={values.pswd} />
                                        {errors.password && <p style={{ color: "red", fontSize: "13px" }}>{errors.password}</p>}
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-12">
                                        <button class="btn btn-success" onClick={(e) => handleSubmit(e)}>Log in</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: () => dispatch(login()),
        setUser: (user) => dispatch(receiveUserDetails(user))

    }
}

export default connect(null, mapDispatchToProps)(StudentLogin)