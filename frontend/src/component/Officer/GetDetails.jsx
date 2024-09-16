import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GetDetails.css';
import OfficerSidebar from './OfficerSidebar';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../Redux/constrant'
import { jsPDF } from 'jspdf';


const GetDetails = () => {
  const [placementDetails, setPlacementDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    document.title = "View Placement";
    axios.get(`${BACKEND_URL}placement/getall`)
      .then((res) => {
        if (res.data) {
          setPlacementDetails(res.data);
        } else {
          alert("Error in fetching data");
        }
      });
  }, []);

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

  const handleGetDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <div>
      <OfficerSidebar />
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <table>
              <thead>
                <tr>
                  <th>SI No</th>
                  <th>Company Name</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {placementDetails.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.companyName}</td>
                    <td>{item?.recruitmentDate}</td>
                    <td>
                      <button className="btn btn-success ms-3 row GetdetailsButton" onClick={() => downloadData(item.placementId)}>Get details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>×</span>
            {selectedItem && (
              <div>
                <h2>Details for {selectedItem.companyName}</h2>
                <p>Recruitment Date: {selectedItem.recruitmentDate}</p>
                {/* Add more details here */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GetDetails;