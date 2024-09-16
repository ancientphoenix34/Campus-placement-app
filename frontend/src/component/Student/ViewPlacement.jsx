import React, { useEffect, useState } from 'react'
import './ViewPlacement.css'
import axios from 'axios'
import { BACKEND_URL } from '../Redux/constrant'
import { useNavigate,Link } from "react-router-dom";
import StudentSidebar from './StudentSidebar';


const ViewPlacement = () => {
  const navigate = useNavigate()
  const [placmentDetails, setPlacementDetails] = useState([])
  useEffect(() => {
    document.title = "View Placement"
    axios.get(`${BACKEND_URL}placement/getall`)
      .then((res) => {
        if (res.data) {
          setPlacementDetails(res.data)
        } else {
          alert("Error in fetching data")
        }
      })
  }, [])

  const viewPlacmentHandle=(id)=>{
    navigate(`/student/applyplacement/${id}`)
  }
  return (
    <div>
      <StudentSidebar/>
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row g-3">
              <div className="col  col-lg-12">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Sl no</th>
                      <th scope="col">Company </th>
                      <th scope="col">Branches qualified</th>
                      <th scope="col">Date of recruitment</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      placmentDetails.map((item,index)=>(
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item?.companyName}</td>
                      <td>{item?.branches}</td>
                      <td>{item?.recruitmentDate}</td>
                      <td>
{/* <Link to='/student/applyplacement'> */}
                          <button onClick={()=>viewPlacmentHandle(item?.placementId)} className="btn btn-primary PlacementView ms-3 row">View</button>
  
{/* </Link>                    
  */}
  </td> 
                    </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPlacement