import React, { useEffect, useState } from 'react'
import './ManageOfficers.css'
import { BACKEND_URL } from '../Redux/constrant'
import axios from 'axios'
import AdminSidebar from './AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'

const ManageOfficers = () => {
  const navigate = useNavigate()
  const [staffDetails, setStaffDetails] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState()
  useEffect(() => {
    render()
  }, [])
  const render = () => {
    axios.get(`${BACKEND_URL}admin/getallstaff`)
      .then((res) => {
        if (res.data) {
          setStaffDetails(res.data)
        }
        else {
          alert("fetching issue")
        }
      })
      .catch((e) => {
        alert("fetching issue")
      })
  }

  const deletehandle = () => {
    axios.delete(`${BACKEND_URL}placement/deletestaff/${deleteId}`)
      .then((res) => {
        if (res.data) {
          alert("deleted successfully")
          navigate('/admin/manageofficer')
          setShowConfirmation(false)
          render()
        }
      })
      .catch((e) => {
        alert(e)
      })
  }
  return (
    <div>
      <AdminSidebar />
      {showConfirmation && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete this item?</p>
          <button onClick={deletehandle}>Yes</button>
          <button onClick={() => {
            setShowConfirmation(false)
          }}>No</button>
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            {
              staffDetails.map((staff) => (
                <div className="row g-3">
                  <div className="col-lg-12">
                    <div class="card">
                      <div class="card-body">
                        <h6>Name: {staff.name}</h6>
                        <h6>UserID:{staff.staffid}</h6>
                        <h6>Dept: {staff.department}</h6>
                        <button className="btn btn-danger OfficerdeleteButton"
                          onClick={() => {
                            setDeleteId(staff.staffid)
                            setShowConfirmation(true)
                          }}
                        >Delete</button>
                        <Link to={`/admin/editofficers/${staff._id}`}><button className="btn btn-primary EditButtonManageOfficer">Edit</button></Link>
                        <img className="ManageOfficerProfpic" src={`${BACKEND_URL}uploads/${staff.profile}`} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageOfficers