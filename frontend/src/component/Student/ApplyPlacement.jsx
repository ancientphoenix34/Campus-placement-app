import React, { useEffect, useState } from 'react'
import './ApplyPlacement.css'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { BACKEND_URL } from '../Redux/constrant';
import StudentSidebar from './StudentSidebar';

const ApplyPlacement = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [placementDetails, setPlacementDetails] = useState({})

  useEffect(() => {
    axios.get(`${BACKEND_URL}placement/get/${id}`)
      .then((res) => {
        setPlacementDetails(res.data)
      })
      .catch((e) => {
        alert(e.message)
      })
  }, [id])

  const backPageHandle = () => {
    navigate(-1)
  }
  const applyPlacementhandle = () =>{
    const data = {
      placementId : placementDetails.placementId,
      studentID : localStorage.getItem("userId")
    }
    axios.post(`${BACKEND_URL}placement/apply`,data)
    .then((res)=>{
      console.log(res);
      if(res.status == 200){
        alert(res.data)
      }
      else
      {
        alert("successfully")
        navigate(-1)
      }
    })
    .catch((e)=>{
      console.log(e)
      alert(e)
    })
  }
  return (
    <div>
      <StudentSidebar/>
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <table>
              <tbody>
                <tr>
                  <th>Company name</th>
                  <td colspan="3">{placementDetails?.companyName}</td>
                </tr>
                <tr>
                  <th>Details</th>
                  <td colspan="3">{placementDetails.recruitmentDetails}</td>
                </tr>
                <tr>
                  <th>Branches</th>
                  <td colspan="3">{placementDetails?.branches}</td>
                </tr>
                <tr>
                  <th>Passing Year</th>
                  <td colspan="3">{placementDetails?.passingYear}</td>
                </tr>
                <tr>
                  <th>10th Aggregate Percentage Cutoff</th>
                  <td>{placementDetails?.tenthpercentage}</td>
                </tr>
                <tr>
                  <th>12th Aggregate Percentage Cutoff</th>
                  <td>{placementDetails.secondarypercentage}</td>
                </tr>
                <tr>
                  <th>{"CGPA"}</th>
                  <td>{placementDetails.cgpa}</td>
                </tr>
                <tr>
                  <th>Maximum Active backlog permitted</th>
                  <td>{placementDetails.backlog}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <cnter>
          <div className='ButtonsOfApplyPlacement'>
            <button onClick={()=>applyPlacementhandle()} className="btn btn-success ApplyForPlacement row ms-3">Apply for Placement</button>
            <button onClick={() => backPageHandle()} className="btn btn-danger BackToView row ">Back </button>
          </div>
        </cnter>
      </div>
    </div>
  )
  }

  export default ApplyPlacement