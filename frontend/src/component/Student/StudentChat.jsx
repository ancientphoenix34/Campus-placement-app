import React, { useEffect, useState } from 'react'
import './StudentChat.css'
import StudentSidebar from './StudentSidebar'
import axios from 'axios'
import { BACKEND_URL } from '../Redux/constrant'
const StudentChat = () => {
  const [ data,setData] = useState([])
  useEffect(()=>{
    axios.get(`${BACKEND_URL}announcements/get`)
    .then((res)=>{
      if(res.data){
        setData(res.data)
      }
      else
      {
        alert("fetching error")
      }
    })
    .catch((e)=>{
      alert(e.message)
    })
  },[])
  return (
    <div><StudentSidebar />
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row g-3">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                <div className="card">
                  <div className="card-header">Post
                  </div>
                  {
                    data.map((item)=>(
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>
                        {/* {value.post} */}
                        {item.postNotes}
                      </p>
                      {/* <footer className="blockquote-footer">
                        { userid }
                      </footer> */}
                    </blockquote>
                    <p className="card-text"><small>
                      Last updated at
                     {" : "} {item.postDate}
                    </small></p>
                  </div>
                    ))
                  }
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentChat