import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Update() {

    const navigate = useNavigate();
    const location = useLocation();

    const bookID = location.pathname.split('/')[2];

    const [book, setBook] = useState({
        title: "",
        description: "",
        cover: ""
    })

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value}));
    }

    // console.log(book);
    const handleClick = async e => {
        e.preventDefault();
        
        try {
            await axios.put("http://localhost:8800/book/" + bookID, book);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Update Book</h1>
            <form>
                {/* <label htmlFor="title">Title</label> */}
                <input type="text" name="title" id="title" placeholder='title' onChange={handleChange}/>

                {/* <label htmlFor="description">Description</label> */}
                <input type="text" name="description" id="description" placeholder='description' onChange={handleChange}/>

                {/* <label htmlFor="cover">Cover</label> */}
                <input type="text" name="cover" id="cover" placeholder='cover' onChange={handleChange}/>

                <button typeof='submit' onClick={handleClick}>Update</button>
            </form>
        </div>
  )
}
