import Modal from './Modal';

const BookCard = ({ key, book, votedBookId, onVote, setVotedBookId, error, isModalOpen, handleCloseModal }) => {
  return (
    <div className="border p-4 bg-white rounded shadow-md shadow-[#0191da] flex flex-col h-full"> {/* Flex container with full height */}
      <div className="h-60 overflow-hidden"> {/* Fixed height container for the image */}
        <img 
          src={`/images/${book.cover_image}`} 
          alt={book.title} 
          className="w-full h-full object-contain" // Use object-contain to show the full image
        />
      </div>
      <div className="flex-grow"> {/* This div will take up remaining space */}
        <h2 className="text-xl mt-4 font-bold text-ellipsis overflow-hidden whitespace-nowrap">{book.title}</h2>
        <p className="text-gray-700 mt-2">Author: {book.author}</p>
        <p className="text-gray-700">Votes: {book.vote_count}</p>
      </div>
      {votedBookId === book.id ? (
        <p className="mt-2 rounded text-white mt-4 py-1 px-4 bg-green-500 text-center">Voted</p>
      ) : (
        <button
          className="bg-blue-500 text-white mt-4 py-1 px-4 rounded hover:bg-green-500 transition-colors duration-200"
          onClick={() => onVote(book.id)}
        >
          Vote
        </button>
      )}
      {isModalOpen && (
		  <Modal onClose={handleCloseModal}>
			<p className="text-md mt-3 text-left text-black">
			  Failed to register vote.
			</p>
			<div className="mt-6 flex justify-center">
			  <button
				className="px-4 py-1 bg-red-500 text-white rounded"
				onClick={handleCloseModal}
			  >
				Close
			  </button>
			</div>
		  </Modal>
	  )}

    </div>
  );
};

export default BookCard;

