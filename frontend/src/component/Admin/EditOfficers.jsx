import React, { useEffect, useState } from 'react'
import './EditOfficers.css'
import AdminSidebar from './AdminSidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BACKEND_URL } from '../Redux/constrant'
import axios from 'axios'

const EditOfficers = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [details, setDetails] = useState()
    const [image, setImage] = useState(details?.profile ?? null)
    const [repassword, setRepassword] = useState()
    useEffect(() => {
        axios.post(`${BACKEND_URL}placement/profile`, { userId: id })
            .then((res) => {
                if (res.data) {
                    setDetails(res.data)
                }
                else {
                    alert("fetching data error found")
                }
            })
            .catch((e) => {
                alert(e)
            })
    }, [id])


    const handleChange = (e) => {
        const { name, value } = e.target
        setDetails({
            ...details,
            [name]: value
        })
    }
    const setProfile = (event) => {
        setImage(event.target.files[0])
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
        const {
            name,
            phoneNumber,
            email,
            department,
            address,
            username,
            password,
        } = details;

        if (
            !name ||
            !phoneNumber ||
            !email ||
            !department ||
            !address ||
            !username ||
            !password
        ) {
            alert("All fields are required");
        } else if (password !== repassword) {
            alert("The given password and re-password don't match");
        } else {
            const formData = new FormData();
            Object.keys(details).forEach(key => {
                formData.append(key, details[key]);
            });
            formData.append("user-profile", image)
            const headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            axios.put(`${BACKEND_URL}placement/updateuser/${id}`, formData, headerConfig)
                .then((res) => {
                    if (res.status === 200) {
                        alert("User Updated Successfully");
                        navigate('/admin/manageofficer');
                    }
                })
                .catch((error) => {
                    console.error("Error uploading image:", error.message);
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
                                        value={details?.name}
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
                                        value={details?.phoneNumber}
                                        onChange={(e) => handleChange(e)}

                                    />
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">Select Department</label>
                                    <select name="department"
                                        id=""
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
                                        value={details?.email}
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
                                        value={details?.address}
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
                                        value={details?.username}
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
                                        value={details?.password}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div class="col-md-6 col-lg-7">
                                    <label for="" class="form-label">Re-enter password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        name='repassword'
                                        value={repassword ?? ""}
                                        onChange={(e) => setRepassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            class="btn btn-success OfficerButton"
                            onClick={() => submitHandle()}
                        >Update officer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditOfficers