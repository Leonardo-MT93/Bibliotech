import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const BookCard = ({ title, genre, id, userId, bookUserId }) => {
  const options = userId === bookUserId;
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const {addFavorite, removeFavorite, getFavorites, deleteBook} = useFetch();
  const handleDelete = (id) => {
    deleteBook(id);
    navigate('/books');
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleToggleFavorite = async() => {
    try {
      if (isFavorite) {
        await removeFavorite(userId, id);
      } else {
        await addFavorite(userId, id);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error al agregar o quitar favorito:', error.message);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorites(userId);
        setIsFavorite(favorites.includes(id));
      } catch (error) {
        console.error('Error al obtener favoritos:', error.message);
      }
    };
  
    if (userId && id) {
      fetchFavorites();
    }
  }, []); 

  return (
    <div className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {!options && (
        <>
          {isFavorite ? (
            <FaHeart
              className={`absolute top-4 right-4 w-6 h-6 text-red-500 cursor-pointer`}
              onClick={handleToggleFavorite}
            />
          ) : (
            <FaRegHeart
              className={`absolute top-4 right-4 w-6 h-6 text-red-500 cursor-pointer`}
              onClick={handleToggleFavorite}
            />
          )}
        </>
      )}

      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {genre}
      </p>
      <Link
        to={`/books/${id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Más info
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
      {options && (
        <>
          <button
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-1 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={() => handleDelete(id)}
          >
            Eliminar
          </button>
          <button
            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            onClick={() => handleEdit(id)}
          >
            Editar
          </button>
        </>
      )}
    </div>
  );
};

export default BookCard;
