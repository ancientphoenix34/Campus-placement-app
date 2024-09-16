import React, { useEffect, useState } from 'react'
import './OfficerProfile.css'
import OfficerSidebar from './OfficerSidebar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../Redux/constrant'

function OfficerProfile() {
    const navigate = useNavigate()
    const [details, setDetails] = useState()
    const userId = JSON.parse(localStorage.getItem('userId'))
    useEffect(() => {
        // console.log({userId});
        axios.post(`${BACKEND_URL}placement/profile`, {userId})
            .then((res) => {
                if (res.data) {
                    setDetails(res.data)
                }
                else {
                    alert("fetching error")
                }
            })
            .catch((err) => {
                alert(err)
            })
    }, [])
    console.log(details);


    return (
        <div>
            <OfficerSidebar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col  col-lg-12 ">
                                <div className="ProfileViewPersonelDetails">
                                    <h5 className='PersonelDetailsHeading'>Officer details</h5>
                                    <div className='personelDetailsCard'>
                                        <img className='OfficerProfileViewPic' src="" alt="" />
                                        <table className='ProfViewTable'>
                                            <tr>
                                                <th>Name</th>
                                                <td>{details?.name}</td>
                                            </tr>
                                            <tr>
                                                <th>User id</th>
                                                <td>{details?.staffid}</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{details?.email}</td>
                                            </tr>
                                            <tr>
                                                <th>Department</th>
                                                <td>{details?.department}</td>
                                            </tr>
                                            <tr>
                                                <th>Address</th>
                                                <td>{details?.address}</td>
                                            </tr>
                                            {/* <tr>
                                                <th>E-mail</th>
                                                <td></td>
                                            </tr> */}
                                            <tr>
                                                <th>Phone no</th>
                                                <td>{details?.phoneNumber}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfficerProfile