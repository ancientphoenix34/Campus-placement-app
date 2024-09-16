import React, { useState } from 'react'
import './OfficerChat'
import OfficerSidebar from './OfficerSidebar'
import axios from 'axios'
import { BACKEND_URL } from '../Redux/constrant'

const OfficerChat = () => {
    const [data, setData] = useState()

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 to month since January is 0
    const day = ('0' + currentDate.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    const changefield = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        axios.post(`${BACKEND_URL}announcements/post`, { postNotes: data.postNotes, postDate: formattedDate })
            .then((res) => {
                if (res.data) {
                    alert("announcement Added")
                }
                else {
                    alert("something wrong")
                }
            })
            .catch((e) => {
                alert(e)
            })
    }
    return (
        <div>
            <OfficerSidebar />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row g-3">
                            <div className="col-12">
                                <label htmlFor="post" className="form-label">Anouncement</label>
                                <textarea
                                    cols="30"
                                    rows="10"
                                    className="form-control"
                                    name="postNotes"
                                    value={data?.postNotes}
                                    onChange={changefield}
                                ></textarea>
                            </div>

                            <div className='col col-lg-7'>
                                <button className="btn btn-primary ms-3 row  OfficerChatPostBtn" onClick={() => handleSubmit()}>
                                    Submit
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OfficerChat