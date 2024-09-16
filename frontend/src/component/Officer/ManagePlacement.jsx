import React, { useEffect, useState } from 'react'
import './ManagePlacement.css'
import axios from 'axios'
import { BACKEND_URL } from '../Redux/constrant'
import OfficerSidebar from './OfficerSidebar'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf';

const ManagePlacement = () => {
  const [placement, setPlacement] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState()
  useEffect(() => {
    render()
  }, [])

  const downloadData = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/placement/applied/student', { placementId: data });
      const jsonData = response.data;
      const doc = new jsPDF();
      jsonData.forEach((item, index) => {
        if (index !== 0) {
          doc.addPage();
        }
        doc.setFontSize(16);
        doc.text(`student ${index + 1}`, 10, 10);
        Object.entries(item).forEach(([key, value], i) => {
          if (key !== 'pswd' && key !== '_id' && key !== 'Academic') {
            const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
            const formattedValue = typeof value === 'object' ? JSON.stringify(value) : value;
            doc.setFontSize(12);
            doc.text(`${formattedKey}: ${formattedValue}`, 10, 20 + i * 10);
          }
        });
      });
      doc.save('data.pdf');
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };
  const render = () => {
    axios.get(`${BACKEND_URL}placement/getall`)
      .then((res) => {
        if (res.data) {
          setPlacement(res.data)
        }
      })
      .catch((e) => {
        alert(e.message)
      })
  }
  const deletehandle = () => {
    axios.delete(`${BACKEND_URL}placement/delete/${deleteId}`)
      .then((res) => {
        if (res.data) {
          alert("deleted successfully")
          // navigate('/admin/manageofficer')
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
      <OfficerSidebar />
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
            <table class="table table-striped ManagePlacement">
              <tr>
                <th>sl No</th>
                <th>Company name</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
              {
                placement.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.companyName}</td>
                    <td>{item.recruitmentDate}</td>
                    <td style={{ width: "300px" }}>
                      <button className="btn btn-danger placementDeleteButtonP"
                        onClick={() => {
                          setDeleteId(item.placementId)
                          setShowConfirmation(true)
                        }}
                      >Delete</button>
                      <Link to={`/officer/editplacements/${item.placementId}`}>  <button className="btn btn-primary placementEditButton">Edit</button></Link>
                    </td>
                  </tr>
                ))
              }

            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagePlacement