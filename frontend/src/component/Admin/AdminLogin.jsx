import React, { useEffect, useState } from 'react';
import './AdminLogin.css';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, receiveUserDetails } from '../Redux/Actions/authAction'
import { BACKEND_URL } from '../Redux/constrant'
import axios from 'axios'

const AdminLogin = (props) => {
    const navigate = useNavigate()
    const
    {
        login,
        setUser
    } = props
    const [values, setValues] = useState({
        username: '',
        password: '',
        role:"admin"
    });

    const [errors, setErrors] = useState({});
    const [redirectToCreateOfficer, setRedirectToCreateOfficer] = useState(false);

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const validation = (values) => {
        let errors = {};

        if (!values.username.trim()) {
            errors.username = "Username is required";
        }

        if (!values.password.trim()) {
            errors.password = "Password is required";
        }

        return errors;
    };  



    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validation(values);
        setErrors(errors);
        
        if (Object.keys(errors).length === 0) {
            // Simple validation, you can implement more complex logic here
            axios.post(`${BACKEND_URL}admin/login2`, values)
            .then((res) => {
                if (res.data) {
                    alert("login successfully")
                    localStorage.setItem("userId", JSON.stringify(res.data._id))
                    navigate('/admin/createstudent')    
                }
                else {
                    alert("invalid password and username")        
                }
            })
            .catch((e) => {
                alert("invalid password and username")
            })
        }
    };

    return (
        <div>
            <form>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-12 col-md-8 col-lg-6 col-xl-4">
                            <div className='card p-4'>
                                <center><h4>Admin</h4></center>
                                <FontAwesomeIcon icon={faUserTie} />
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" onChange={handleChange} name='username' value={values.username} />
                                        {errors.username && <p style={{ color: "red", fontSize: "13px" }}>{errors.username}</p>}
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" name="password" className="form-control" onChange={handleChange} value={values.password} />
                                        {errors.password && <p style={{ color: "red", fontSize: "13px" }}>{errors.password}</p>}
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <button 
                                        onClick={(e)=>handleSubmit(e)}
                                        className="btn btn-success AdminLoginButton">Log in</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => {
    return {
        login: () => dispatch(login()),
        setUser: (user) => dispatch(receiveUserDetails(user))

    }
}

export default connect(null,mapDispatchToProps)(AdminLogin)
