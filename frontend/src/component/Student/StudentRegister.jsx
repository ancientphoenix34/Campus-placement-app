import React, { useEffect, useState } from 'react'
import './StudentRegister.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../Redux/constrant'
import StudentSidebar from './StudentSidebar'

const StudentRegister = () => {
    const [data, setData] = useState()
    const [image,setImage] = useState()
    const navigate = useNavigate()
    const id = localStorage.getItem('userId')
    useEffect(() => {
        axios.post(`${BACKEND_URL}student/getuser`, { id })
            .then((res) => {
                if (res.data) {
                    setData(res.data)
                }
                else {
                    alert("fetching error")
                }
            })
            .catch((e) => {
                alert(e)
            })
    }, [id])

    const handleChange = (e) => {
        console.log("called");
        const { name, value } = e.target;
        setData(prev => {
            return { ...prev, [name]: value }
        })
    }
    const changepic= (e)=>{
        setImage(e.target.files[0])
    }
    const handleAcadmicChange = (e) => {
        setData(prevData => ({
            ...prevData,
            Academic: {
                ...prevData.Academic,
                [e.target.name]: e.target.value
            }
        }));
    }

    const backPageHandle = () => {
        navigate(-1)
    }

    const handleSubmit = async (e) => {
        const newData = new FormData();
        
         function appendFormData(data, prefix = "") {
            for (const key in data) {
                if (typeof data[key] === "object") {
                    appendFormData(data[key], `${prefix}[${key}]`);
                } else {
                    newData.append(`${prefix}[${key}]`, data[key]);
                }
            }
        }
        appendFormData(data);
        newData.append("user-profile",image)
        e.preventDefault();
        try {
            const response = await axios.put(
                `${BACKEND_URL}student/update/${data.username}`,
                newData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }
              );
              
            if (response.data) {
                alert("You have Profile Update successfully!")
                navigate('/student/studentprofile   ')
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert(error.response.data) 
        }
    };

    return (
        <div>
            <StudentSidebar />
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
                                        value={data?.fname || ''}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Middle name</label>
                                    <input type="text"
                                        className="form-control"
                                        name="mname"
                                        value={data?.mname || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Last name</label>
                                    <input type="text" className="form-control"
                                        name="lname"
                                        value={data?.lname || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-7">
                                    <label htmlFor="" className="form-label">Admn no/Username</label>
                                    <input type="text"
                                        className="form-control"
                                        name="username"
                                        onChange={handleChange}
                                        value={data?.username || ''}
                                    />
                                </div>
                                <div class="col-md-5">
                                    <label for="" class="form-label">Upload Profile Pic</label>
                                    <input type="file"
                                        class="form-control"
onChange={(e)=>changepic(e)}
                                    />
                                </div>
                                <div class="col-lg-7">
                                    <label for="gender" class="form-label">Select gender</label>
                                    <input type="text" className="form-control"
                                        name="gender"
                                        value={data?.gender || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-7">
                                    <label htmlFor="" className="form-label">Date of birth</label>
                                    <input type="text" className="form-control"
                                        name="dob"
                                        value={data?.dob || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-7">
                                    <label htmlFor="" className="form-label">Religion</label>
                                    <input type="text" className="form-control"
                                        name="religion"
                                        value={data?.religion || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div class="col-12 col-lg-7">
                                    <label for="" class="form-label">Address</label>
                                    <textarea id="address" rows="4" class="form-control"
                                        name="address"
                                        value={data?.address || ''}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div class="col-12 col-lg-7">
                                    <label for="" class="form-label">password</label>
                                    <input type='text' class="form-control"
                                        name="pswd"
                                        value={data?.pswd || ''}
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
                                    <input type="text" className="form-control"
                                        name="course" onChange={handleAcadmicChange}
                                        value={data?.Academic?.course || ''}
                                    />
                                </div>
                                <div className="col-lg-7">
                                    <label htmlFor="" className="form-label">Year of Admn</label>
                                    <input type="text"
                                        className="form-control"
                                        name="yearAdmin"
                                        value={data?.Academic?.yearAdmin || ''}
                                        onChange={handleAcadmicChange}
                                    />
                                </div>
                                <div className="col-lg-7">
                                    <label htmlFor="" className="form-label">Course duration(in years)</label>
                                    <input type="text"
                                        className="form-control"
                                        name="courseDuration"
                                        onChange={handleAcadmicChange}
                                        value={data?.Academic?.courseDuration || ''}
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <div className="TenthDEtails row">
                                        <h5>10th details</h5>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Board/University</label>
                                            <input type="text" className="form-control"
                                                name="tenthboard"
                                                value={data?.Academic?.tenthboard || ''}
                                                onChange={handleAcadmicChange}
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Passing year</label>
                                            <input type="text" className="form-control"
                                                name="tenthpassYear"
                                                value={data?.Academic?.tenthpassYear || ''}
                                                onChange={handleAcadmicChange}
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Percentage/CGPA</label>
                                            <input type="text" className="form-control"
                                                name="tenthCGPA"
                                                value={data?.Academic?.tenthCGPA || ''}
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
                                                value={data?.Academic?.twelveBoard || ''}
                                                onChange={handleAcadmicChange}
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Passing year</label>
                                            <input type="text" className="form-control"
                                                name="twelvepassYear"
                                                value={data?.Academic?.twelvepassYear || ''}
                                                onChange={handleAcadmicChange}
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Percentage/CGPA</label>
                                            <input type="text" className="form-control"
                                                name="twelveCGPA"
                                                value={data?.Academic?.twelveCGPA || ''}
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
                                                value={data?.Academic?.ugBoard || ''}
                                                onChange={handleAcadmicChange}
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Passing year</label>
                                            <input type="text" className="form-control"
                                                name="ugpassyear"
                                                value={data?.Academic?.ugpassyear || ''}
                                                onChange={handleAcadmicChange}
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="" className="form-label">Percentage/CGPA</label>
                                            <input type="text" className="form-control"
                                                name="ugCGPA"
                                                value={data?.Academic?.ugCGPA || ''}
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
                                        value={data?.phn || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="" className="form-label">enter alternative phone number</label>
                                    <input type="text" className="form-control"
                                        name="phnalt"
                                        value={data?.phnalt || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="" className="form-label">enter email</label>
                                    <input type="text" className="form-control"
                                        name="email"
                                        value={data?.email || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="" className="form-label">enter alternative email</label>
                                    <input type="text" className="form-control"
                                        name="emailalt"
                                        value={data?.emailalt || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Father's name</label>
                                    <input type="text" className="form-control"
                                        name="fatherName"
                                        value={data?.fatherName || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Occupation</label>
                                    <input type="text" className="form-control"
                                        name="fatherOccpt"
                                        value={data?.fatherOccpt || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Phone number</label>
                                    <input type="text" className="form-control"
                                        name="fatherphn"
                                        value={data?.fatherphn || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Mother's name</label>
                                    <input type="text" className="form-control"
                                        name="motherName"
                                        value={data?.motherName || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Occupation</label>
                                    <input type="text" className="form-control"
                                        name="motherOccpt"
                                        value={data?.motherOccpt || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label htmlFor="" className="form-label">Phone number</label>
                                    <input type="text" className="form-control"
                                        name="motherphn"
                                        value={data?.motherphn || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={(e) => handleSubmit(e)} className="btn btn-success ms-3 row CreateStudButton" >Update</button>
                <button onClick={() => backPageHandle()} className="btn btn-danger BackToStudProf row ">Back </button>

            </div>
        </div>
    )
}

export default StudentRegister