import React from 'react'
import { faEnvelope, faUserTie, faGraduationCap, faPerson } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Home.css'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row g-3">
              <div className="col col-lg-6 Homecard">
              <Link to={'/admin/login'} >
                  <div className='AdminHomeLogin'>
                    <FontAwesomeIcon icon={faUserTie} />
                    <h4>admin</h4>
                  </div>
                </Link>
                <Link to={'/officer/login'}>
                  <div className='OfficerHomeLogin'>
                    <FontAwesomeIcon icon={faPerson} />
                    <h4>Officer</h4>
                  </div>
                </Link>
                <Link to={'/student/login'} >
                  <div className='StudentHomeLogin'>
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <h4>Student</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home