import React, { useState, useEffect } from 'react'
import './CreateOfficer.css'
import { BACKEND_URL } from '../Redux/constrant'
import axios from 'axios'
import AdminSidebar from './AdminSidebar'
import { useNavigate } from 'react-router-dom'

const CreateOfficer = () => {
    const navigate = useNavigate()

    //profile pic part
    const [preview, setPreview] = useState("")
    //create state to hold img
    const [image, setImage] = useState("")

    const setProfile = (event) => {
        setImage(event.target.files[0]);
    }

    const [details, setDetails] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        department: "",
        address: "",
        username: "",
        password: "",
        repassword: ""
    })
    const {
        name,
        phoneNumber,
        email,
        department,
        address,
        username,
        password,
        repassword
    } = details

    const handleChange = (e) => {
        const { name, value } = e.target
        setDetails({
            ...details,
            [name]: value
        })
    }

    const handleDropDown = (data) => {
        console.log(data);
        const { value, name } = data.target
        console.log(value);
        setDetails({
            ...details,
            [name]: value
        })
    }

    const submitHandle = () => {
        console.log(details);
        if (
            !name ||
            !phoneNumber ||
            !email ||
            !department ||
            !address ||
            !username ||
            !password ||
            !repassword
        ) {
            alert("all field are Required")
        }
        else if (password !== repassword) {
            alert("the given password and re password aren't matched")
        }
        else {
            const formData = new FormData();
            Object.keys(details).forEach(key => {
                formData.append(key, details[key]);
            });
            formData.append("user-profile",image)
            const headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            axios.post(`${BACKEND_URL}admin/addstaff`, formData, headerConfig)
                .then((res) => {
                    if (res.status === 201) {
                        alert("Staff Added Successfully");
                        navigate('/admin/manageofficer');
                    } else {
                        alert(res.data);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    return (
        <div>
            <AdminSidebar />
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="Officerpersonaldetails">
                            <h4>Personnel Details</h4>
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="" class="form-label">Name</label>
                                    <input type="text"
                                        class="form-control"
                                        value={details.name}
                                        name="name"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">Upload Profile Pic</label>
                                    <input type="file"
                                        onChange={(e) => setProfile(e)}
                                        class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label for=""
                                        class="form-label"
                                    >
                                        Phone number
                                    </label>
                                    <input type="text"
                                        class="form-control"
                                        name='phoneNumber'
                                        value={details.phoneNumber}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">Select Department</label>
                                    <select name="department" id=""
                                        onChange={(e) => handleDropDown(e)}
                                    >
                                        <option value="" disabled selected>Select</option>
                                        <option value="Placement">Placement</option>
                                        <option value="B.Tech CS">B.Tech CS</option>
                                        <option value="B.Tech Mech">B.Tech Mech</option>
                                        <option value="B.Tech Chhemical">B.Tech Chemical</option>

                                    </select>

                                </div>
                                <div class="col-md-6 col-lg-6">
                                    <label
                                        for=""
                                        class="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        name='email'
                                        value={details.email}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div class="col-md-6 col-lg-7">
                                    <label for=""
                                        class="form-label">Address</label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        rows="4"
                                        class="form-control"
                                        value={details.value}
                                        onChange={(e) => handleChange(e)}
                                    >
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div class="OfficerLoginDetails">
                            <h4>Officer Login Details</h4>
                            <div class="row">
                                <div class="col-md-6 col-lg-7">
                                    <label for=""
                                        class="form-label">Username</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        value={details.username}
                                        name='username'
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div class="col-md-6 col-lg-7">
                                    <label for="" class="form-label">Enter password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        name='password'
                                        value={details.password}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div class="col-md-6 col-lg-7">
                                    <label for="" class="form-label">Re-enter password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        name='repassword'
                                        value={details.repassword}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            class="btn btn-success OfficerButton"
                            onClick={() => submitHandle()}
                        >Create Placement Officer
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CreateOfficer