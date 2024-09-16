import React, { useEffect, useState } from 'react'
import './EditPlacements'
import OfficerSidebar from './OfficerSidebar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../Redux/constrant'


const EditPlacements = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState()
    const [placementDetails, setplacementDetails] = useState()
    console.log(placementDetails);
    useEffect(() => {
        axios.get(`${BACKEND_URL}placement/get/${id}`)
            .then((res) => {
                if (res.data) {
                    setplacementDetails(res.data)
                }
                else {
                    alert("fetching error")
                }
            })
            .catch((e) => {
                alert(e)
            })
    }, [id])
    console.log(data);

    const changeHandle = (e) => {
        const { name, value } = e.target
        setplacementDetails({
            ...placementDetails,
            [name]: value
        })
    }

    const registerplacementHandle = () => {
        const {
            companyName,
            recruitmentDate,
            recruitmentDetails,
            branches,
            passingYear,
            tenthpercentage,
            secondarypercentage,
            cgpa,
        } = placementDetails

        if (!companyName ||
            !recruitmentDate ||
            !recruitmentDetails ||
            !branches ||
            !passingYear ||
            !tenthpercentage ||
            !secondarypercentage ||
            !cgpa
            // !backlog
        ) {
            alert("all field are required")
        }
        else {
            axios.put(`${BACKEND_URL}placement/update/${id}`, placementDetails)
                .then((res) => {
                    if (res.data) {
                        alert("placement Updated")
                        navigate('/officer/manageplacement')
                    }
                })
                .catch((e) => {
                    alert(e.message)
                })
        }
    }

    return (
        <div>
            <OfficerSidebar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className='cardPlacement'>
                            <div className="row g-3">
                                <div className="col col-lg-7 ">
                                    <label htmlFor="" className="form-label">Company</label>
                                    <input type="text"
                                        className="form-control"
                                        name='companyName'
                                        value={placementDetails?.companyName}
                                        onChange={changeHandle}

                                    />
                                </div>
                                <div className="col col-lg-7 ">
                                    <label htmlFor="" className="form-label">Recruitment date</label>
                                    <input type="date"
                                        className="form-control"
                                        value={placementDetails?.recruitmentDate}
                                        onChange={changeHandle}
                                        name='recruitmentDate'

                                    />
                                </div>
                                <div className="col  col-lg-7">
                                    <label htmlFor="" className="form-label">Recruitment Details</label>
                                    <br></br>
                                    <textarea id="message"
                                        name="recruitmentDetails"
                                        rows="4"
                                        cols="50"
                                        value={placementDetails?.recruitmentDetails}
                                        onChange={changeHandle}
                                    ></textarea>
                                </div>
                                <div className="col col-lg-7">
                                    <div className="col-12">
                                        <label>Select Branches qualified:</label><br />
                                        <label>
                                            <input type="radio" name='branches' id='branches' value={"MCA"} onChange={changeHandle} checked={placementDetails?.branches === "MCA"} />
                                            MCA
                                        </label><br />
                                        <label>
                                            <input type="radio" name='branches' id='branches'
                                                value={"B tech cs"} onChange={changeHandle} checked={placementDetails?.branches === "B tech cs"}
                                            />
                                            B tech cs
                                        </label><br />
                                        <label>
                                            <input type="radio" name='branches' id='branches'
                                                value={"EEC"} onChange={changeHandle} checked={placementDetails?.branches === "EEC"}
                                            />
                                            EEC
                                        </label><br />
                                        <label>
                                            <input type="radio" name='branches' id='branches'
                                                value={"Mech"} onChange={changeHandle} checked={placementDetails?.branches === "Mech"}
                                            />
                                            Mech
                                        </label>
                                    </div>
                                </div>
                                <div className="col col-lg-7 ">
                                    <label htmlFor="" className="form-label">passing out year</label>
                                    <input type="text"
                                        className="form-control"
                                        value={placementDetails?.passingYear}
                                        name='passingYear'
                                        onChange={changeHandle}
                                    />
                                </div>
                                <div className="col  col-lg-7 ">
                                    <label htmlFor="" className="form-label">10th Aggregate Percentage Cutoff</label>
                                    <input type="text"
                                        className="form-control"
                                        value={placementDetails?.tenthpercentage}
                                        name='tenthpercentage'
                                        onChange={changeHandle}
                                    />
                                </div>
                                <div className="col col-lg-7 ">
                                    <label htmlFor="" className="form-label">12th Aggregate Percentage Cutoff</label>
                                    <input type="text"
                                        className="form-control"
                                        value={placementDetails?.secondarypercentage}
                                        name='secondarypercentage'
                                        onChange={changeHandle}
                                    />
                                </div>
                                <div className="col col-lg-7 ">
                                    <label htmlFor="" className="form-label">CGPA Cutoff</label>
                                    <input type="text"
                                        className="form-control"
                                        value={placementDetails?.cgpa}
                                        name='cgpa'
                                        onChange={changeHandle}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-7 ">
                            <button
                                onClick={() => registerplacementHandle()}
                                className="btn btn-success ms-3 row CreatePlacementButton">Update placement</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPlacements