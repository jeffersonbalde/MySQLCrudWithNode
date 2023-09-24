import React, { useEffect, useState } from 'react'
import axios, { Axios } from "axios";
import { Link } from 'react-router-dom';

export default function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data); 
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/book/"+id);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <h1>BOOKS FOR SELF IMPROVEMENT</h1>
        <div className="container">
            {books.map((book) => (
                <div className='book' key={book.id}>
                    {book.cover && <img src={book.cover} alt={book.title} />}
                    <h1>{book.title}</h1>
                    <p>{book.description}</p>
                    <button onClick={() => handleDelete(book.id)}>Delete</button>
                    <button>
                        <Link to={`/update/${book.id}`}>Update</Link>
                    </button>
                </div>
            ))}
        </div>
        <div className='btn'>
            <button>
                <Link to="/add">Add Book</Link>
            </button>
        </div>
    </div>
  )
}