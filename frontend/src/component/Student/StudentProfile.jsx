import React, { useEffect, useState } from 'react'
import './StudentProfile.css'
import axios from 'axios'
import { BACKEND_URL } from '../Redux/constrant'
import { connect } from 'react-redux';
import StudentSidebar from './StudentSidebar';

const StudentProfile = ({
    student
}) => {

    console.log(student);
    const [profileDetails, setProfileDetails] = useState()
    const id = localStorage.getItem('userId')
    useEffect(() => {
        axios.post(`${BACKEND_URL}student/getuser`, { id })
            .then((res) => {
                setProfileDetails(res.data)
            })
            .catch((e) => {
                alert(e.message)
            })
    }, [id])

    console.log(profileDetails);
    return (
        <div>
            <StudentSidebar/>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col  col-lg-12 ">
                                <div className="ProfileViewPersonelDetails">
                                    <h5 className='PersonelDetailsHeading'>Personnel Details</h5>
                                    <div className='personelDetailsCard'>
                                        <img className='ProfileViewPic'  src={`${BACKEND_URL}uploads/${profileDetails?.profile}`} alt="" />
                                        <table className='ProfViewTable'>
                                            <tr>
                                                <th>Student's name</th>
                                                <td> {profileDetails?.fname} {" "} {profileDetails?.mname} {" "} {profileDetails?.lname}</td>
                                            </tr>
                                            <tr>
                                                <th>Admn no</th>
                                                <td>{profileDetails?.username}</td>
                                            </tr>
                                            <tr>
                                                <th>Gender</th>
                                                <td>{profileDetails?.gender}</td>
                                            </tr>
                                            <tr>
                                                <th>Date of birth</th>
                                                <td>{profileDetails?.dob}</td>
                                            </tr>
                                            <tr>
                                                <th>Religion</th>
                                                <td>{profileDetails?.religion}</td>
                                            </tr>
                                            <tr>
                                                <th>E-mail</th>
                                                <td>{profileDetails?.email}</td>
                                            </tr>
                                            <tr>
                                                <th>alternative E-mail</th>
                                                <td>{profileDetails?.emailalt}</td>
                                            </tr>
                                            <tr>
                                                <th>Phone no</th>
                                                <td>{profileDetails?.phn}</td>
                                            </tr>
                                            <tr>
                                                <th>alternative Phone no</th>
                                                <td>{profileDetails?.phnalt}</td>
                                            </tr>
                                            <tr>
                                                <th>Father's name</th>
                                                <td>{profileDetails?.fatherName}</td>
                                            </tr>
                                            <tr>
                                                <th>Mother's name</th>
                                                <td>{profileDetails?.motherName}</td>
                                            </tr>
                                            <tr>
                                                <th>Address</th>
                                                <td>{profileDetails?.address}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col col-lg-12">
                        <div className='StudProfAcademicDetails'>
                            <h5 className='academicDetailsHeading'>Academic details</h5>
                            <div className='StudProfAcademicDetailsCard'>
                                <table className='CurrentCourse'>
                                    <tr>
                                        <th>Current course</th>
                                        <td>{profileDetails?.Academic?.course}</td>
                                    </tr>
                                    <tr>
                                        <th>Course Duration</th>
                                        <td>{profileDetails?.Academic?.courseDuration}</td>
                                    </tr>
                                    <tr>
                                        <th>Year of Admn</th>
                                        <td>{profileDetails?.Academic?.yearAdmin}</td>
                                    </tr>
                                    <tr>
                                        <th>previous qualification</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Passout Year</th>
                                        <td> </td>
                                    </tr>
                                </table>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Qualification</th>
                                            <th>Board/University</th>
                                            <th>Passing Year</th>
                                            <th>Percentage/CGPA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>10th</td>
                                            <td>{profileDetails?.Academic?.tenthboard}</td>
                                            <td>{profileDetails?.Academic?.tenthpassYear}</td>
                                            <td>{profileDetails?.Academic?.tenthCGPA}</td>
                                        </tr>
                                        <tr>
                                            <td>PLUS 2</td>
                                            <td>{profileDetails?.Academic?.twelveBoard}</td>
                                            <td>{profileDetails?.Academic?.twelvepassYear}</td>
                                            <td>{profileDetails?.Academic?.twelveCGPA}</td>
                                        </tr>
                                        <tr>
                                            <td>BCA</td>
                                            <td>{profileDetails?.Academic?.ugBoard}</td>
                                            <td>{profileDetails?.Academic?.ugpassyear}</td>
                                            <td>{profileDetails?.Academic?.ugCGPA}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* <button className="btn btn-primary ResumeView row ms-3">View resume</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    student: state.userdata
});

export default connect(mapStateToProps)(StudentProfile)