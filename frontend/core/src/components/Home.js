import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [isbn, setIsbn] = useState('');
  const [editBookId, setEditBookId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8000/api/books/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:8000/api/books/',
        { title, author, published_date: publishedDate, isbn },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBooks([...books, response.data]);
      resetForm();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const deleteBook = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8000/api/books/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const updateBook = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:8000/api/books/${editBookId}/`,
        { title, author, published_date: publishedDate, isbn },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBooks(
        books.map((book) =>
          book.id === editBookId ? response.data : book
        )
      );
      resetForm();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleEditClick = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setPublishedDate(book.published_date);
    setIsbn(book.isbn);
    setEditBookId(book.id);
  };

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setPublishedDate('');
    setIsbn('');
    setEditBookId(null);
  };

  return (
    <MDBContainer>
      <h1 className="text-center my-4">Book Collection</h1>
      <MDBCard className="mb-4">
        <MDBCardBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editBookId ? updateBook() : addBook();
            }}
          >
            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mb-4"
                />
              </MDBCol>
              <MDBCol md="6">
                <MDBInput
                  label="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="mb-4"
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  label="Published Date"
                  type="date"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  required
                  className="mb-4"
                />
              </MDBCol>
              <MDBCol md="6">
                <MDBInput
                  label="ISBN"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  required
                  className="mb-4"
                />
              </MDBCol>
            </MDBRow>
            <MDBBtn type="submit" color="primary">
              {editBookId ? 'Update Book' : 'Add Book'}
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
      <MDBRow>
        {books.map((book) => (
          <MDBCol md="4" key={book.id} className="mb-4">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>{book.title}</MDBCardTitle>
                <MDBCardText>
                  Author: {book.author}
                  <br />
                  Published Date: {book.published_date}
                  <br />
                  ISBN: {book.isbn}
                </MDBCardText>
                <MDBBtn color="warning" onClick={() => handleEditClick(book)} className="me-2">
                  Edit
                </MDBBtn>
                <MDBBtn color="danger" onClick={() => deleteBook(book.id)}>
                  Delete
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

export default Home;
