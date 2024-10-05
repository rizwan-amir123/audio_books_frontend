import React, { useEffect, useState, useMemo } from 'react';
import BookCard from './BookCard';
import Header from './Header';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [votedBookId, setVotedBookId] = useState(null);
  const token = localStorage.getItem('token');
  const [error, setError] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal when error occurs
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(false);
  };
  
  useEffect(() => {
	  if (error) {
		handleOpenModal();
	  }
  }, [error]);
  
  const userId = useMemo(() => {
	  if (token) {
		const decodedToken = jwtDecode(token);
		return decodedToken.sub; // Adjust the key based on your token structure
	  }
	  return null;
  }, [token]);
  
  const fetchBooksAndVote = async () => {
    try {
      // Fetch books
      const bookResponse = await fetch('http://127.0.0.1:5000/books', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const booksData = await bookResponse.json();
      setBooks(booksData);

      // Fetch user's vote
      const voteResponse = await fetch(`http://127.0.0.1:5000/votes/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const voteData = await voteResponse.json();

      if (voteData.book_id) {
        setVotedBookId(voteData.book_id._id.$oid); // Set the voted book ID
      }
    } catch (error) {
      console.error("Error fetching books or vote:", error);
    }
  };

  useEffect(() => {
    fetchBooksAndVote();
  }, [userId]);

  const handleVote = async (bookId) => {
    try {
		const response = await fetch(`http://127.0.0.1:5000/books/${bookId}/vote`, {
		  method: 'PUT',
		  headers: {
		    'Authorization': `Bearer ${token}`,
		    'Content-Type': 'application/json',
		  },
		});
		
		const data = await response.json();
		if (data.message === 'Vote updated') {
		  setVotedBookId(bookId); // Update voted book ID
		  fetchBooksAndVote(); // Refresh data
		  setError(false)
		}
    } catch (error) {
		setError(true); // Optionally, set an error state to inform the user
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to the sign-in page
  };
  

  return (
    <div className="min-h-screen bg-gray-800 p-4 md:p-8">
      <Header onLogout={logout} />
      <h1 className="text-3xl font-bold mb-2 mt-10 text-white">Audio Books Voting</h1>
      <h3 className="mb-10 mt-2 text-white">Vote for your favorite audio book here.</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.length > 0 ? books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            votedBookId={votedBookId}  
            onVote={handleVote}
            setVotedBookId={setVotedBookId}
            error={error}
            isModalOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
            
          />
        )) : <p className="text-white">No Books Found</p>}
      </div>
    </div>
  );
};

export default Dashboard;

