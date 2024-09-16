import React, { useEffect, useState } from 'react'
import './ManageStudents.css'
import { BACKEND_URL } from '../Redux/constrant'
import axios from 'axios'
import AdminSidebar from './AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'
const ManageStudents = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState()
  useEffect(() => {
    document.title = "Manage Students"
    axios.get(`${BACKEND_URL}student/getall`)
      .then((res) => {
        console.log(res.data)
        setUserData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [])
  console.log(userData);
  const deletehandle = () => {
    axios.delete(`${BACKEND_URL}placement/deleteStudent/${deleteId}`)
      .then((res) => {
        if (res.status == 200) {
          alert("deleted successfully")
          navigate('')
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
            <div className="row g-3">
              <div className="col  col-lg-12">
                <table class="table table-striped ManageStudentTable">
                  <thead>
                    <tr>
                      <th scope="col">Sl no</th>
                      <th scope="col">Name</th>
                      <th scope="col">Branch</th>
                      <th scope="col">Year of Admn</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      userData.map((item) => (
                        <tr>
                          <th scope="row">1</th>
                          <td>{item.fname + " " + item.mname + " " + item.lname}</td>
                          <td>{item.Academic.course}</td>
                          <td>{item.Academic.yearAdmin}</td>
                          <td>
                            <Link to={`/admin/editstudents/${item._id}`}>
                              <button className="btn btn-primary ManageStudView ">Edit</button>
                            </Link>
                            <button className="btn btn-danger ManageStudDel"
                              onClick={() => {
                                setDeleteId(item.username)
                                setShowConfirmation(true)
                              }}
                            >Delete</button>
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

export default ManageStudents