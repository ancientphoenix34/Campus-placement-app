import React, { useState } from 'react'
import './CreateStudent.css'
import { BACKEND_URL } from '../Redux/constrant';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import AdminSidebar from './AdminSidebar';

const CreateStudent = () => {
    const navigate = useNavigate()
    const [data, setdata] = useState({});

    const handleChange = (e) => {
        console.log("called");
        const { name, value } = e.target;
        setdata(prev => {
            return { ...prev, [name]: value }
        })
    }
    const handleAcadmicChange = (e) => {
        setdata(prevData => ({
            ...prevData,
            Academic: {
                ...prevData.Academic,
                [e.target.name]: e.target.value
            }
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(data);
            const response = await axios.post(`${BACKEND_URL}student/register`, data);
            if (response.data) {
                alert("You have successfully registered!")
                navigate('/admin/manageStudents')
            }
            // Handle successful registration, e.g., redirect the user to another page
        } catch (error) {
            console.error('Error registering user:', error);
            alert(error.response.data)   //display error message
            // Handle error, e.g., display an error message to the user
        }
    };
    console.log(data);
    return (
        <div>
            <AdminSidebar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="StudentDetails">
                            <h4>Student Details</h4>
                            <div className="row g-3">
                                <div className="col-lg-4">
                                    <label htmlFor=""
                                        className="form-label"
                                    >First name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fname"
                                        value={data.fname || ''}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Middle name</label>
                                    <input type="text"
                                        className="form-control"
                                        name="mname"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Last name</label>
                                    <input type="text" className="form-control"
                                        name="lname"
                                        onChange={handleChange} />
                                </div>
                                <div className="col-lg-7">
                                    <label htmlFor="" className="form-label">Admn no/Username</label>
                                    <input type="text" className="form-control" name="username"
                                        onChange={handleChange} />
                                </div>
                                {/* <div class="col-md-5">
                                    <label for="" class="form-label">Upload Profile Pic</label>
                                    <input type="file"
                                        class="form-control" />
                                </div> */}
                                <div class="col-lg-7">
                                    <label for="gender" class="form-label">Select gender</label>
                                    <input type="text" className="form-control" name="gender"
                                        onChange={handleChange} />
                                </div>
                                <div className="col-lg-7">
                                    <label htmlFor="" className="form-label">Date of birth</label>
                                    <input type="text" className="form-control"
                                        name="dob"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-7">
                                    <label htmlFor="" className="form-label">Religion</label>
                                    <input type="text" className="form-control"
                                        name="religion"
                                        onChange={handleChange} />
                                </div>
                                <div class="col-12 col-lg-7">
                                    <label for="" class="form-label">Address</label>
                                    <textarea id="address" rows="4" class="form-control"
                                        name="address"
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div class="col-12 col-lg-7">
                                    <label for="" class="form-label">password</label>
                                    <input type='text' class="form-control"
                                        name="pswd"
                                        onChange={handleChange}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className="AcademicProfile">
                            <h4>Academic details</h4>
                            <div className="row g-3">
                                <div className="col-lg-7">
                                    <label htmlFor="" className="form-label">Opted Course</label>
                                    <input type="text" className="form-control" name="course"
                                        onChange={handleAcadmicChange} />
                                </div>
                                <div className="col-lg-7">
                                    <label htmlFor="" className="form-label">Year of Admn</label>
                                    <input type="text" className="form-control" name="yearAdmin"
                                        onChange={handleAcadmicChange} />
                                </div>
                                <div className="col-lg-7">
                                    <label htmlFor="" className="form-label">Course duration(in years)</label>
                                    <input type="text" className="form-control" name="courseDuration"
                                        onChange={handleAcadmicChange} />
                                </div>
                                <div className="col-lg-12">
                                    <div className="TenthDEtails row">
                                        <h5>10th details</h5>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Board/University</label>
                                            <input type="text" className="form-control"
                                                name="tenthboard"
                                                onChange={handleAcadmicChange}
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Passing year</label>
                                            <input type="text" className="form-control"
                                                name="tenthpassYear"
                                                onChange={handleAcadmicChange}
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Percentage/CGPA</label>
                                            <input type="text" className="form-control"
                                                name="tenthCGPA"
                                                onChange={handleAcadmicChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="TwelfthDEtails row">
                                        <h5>12th details</h5>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Board/University</label>
                                            <input type="text" className="form-control"
                                                name="twelveBoard"
                                                onChange={handleAcadmicChange}
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Passing year</label>
                                            <input type="text" className="form-control"
                                                name="twelvepassYear"
                                                onChange={handleAcadmicChange}
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Percentage/CGPA</label>
                                            <input type="text" className="form-control"
                                                name="twelveCGPA"
                                                onChange={handleAcadmicChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="Degree row">
                                        <h5>UG details</h5>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Board/University</label>
                                            <input type="text" className="form-control"
                                                name="ugBoard"
                                                onChange={handleAcadmicChange}
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Passing year</label>
                                            <input type="text" className="form-control"
                                                name="ugpassyear"
                                                onChange={handleAcadmicChange}
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Percentage/CGPA</label>
                                            <input type="text" className="form-control"
                                                name="ugCGPA"
                                                onChange={handleAcadmicChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="ContactDetails">
                            <h4>Contact Details</h4>
                            <div className="row g-3">
                                <div className="col-lg-6">
                                    <label htmlFor="" className="form-label">enter phone number</label>
                                    <input type="text"
                                        className="form-control"
                                        name="phn"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="" className="form-label">enter alternative phone number</label>
                                    <input type="text" className="form-control"
                                        name="phnalt"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="" className="form-label">enter email</label>
                                    <input type="text" className="form-control"
                                        name="email"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="" className="form-label">enter alternative email</label>
                                    <input type="text" className="form-control"
                                        name="emailalt"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Father's name</label>
                                    <input type="text" className="form-control"
                                        name="fatherName"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Occupation</label>
                                    <input type="text" className="form-control"
                                        name="fatherOccpt"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Phone number</label>
                                    <input type="text" className="form-control"
                                        name="fatherphn"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Mother's name</label>
                                    <input type="text" className="form-control"
                                        name="motherName"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Occupation</label>
                                    <input type="text" className="form-control"
                                        name="motherOccpt"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Phone number</label>
                                    <input type="text" className="form-control"
                                        name="motherphn"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-success ms-3 CreateStudButton" onClick={(e)=>handleSubmit(e)}>Submit</button>
            </div>
        </div>
    )
}

export default CreateStudent