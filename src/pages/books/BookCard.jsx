import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="h-full transition-shadow duration-300 rounded-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:h-72 sm:justify-center">
        {/* Image */}
        <div className="border rounded-md sm:h-72 sm:flex-shrink-0">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt=""
              className="w-full p-2 transition-all duration-200 bg-cover rounded-md cursor-pointer hover:scale-105"
            />
          </Link>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 h-full">
          <Link to={`/books/${book._id}`}>
            <h3 className="mb-3 text-xl font-semibold hover:text-blue-600">
              {book?.title}
            </h3>
          </Link>

          {/* Description grows */}
          <p className="flex-grow text-gray-600">
            {book.description.length > 90
              ? `${book?.description.slice(0, 80)}...`
              : book?.description}
          </p>

          {/* Price + Button pinned bottom */}
          <div className="mt-auto">
            <p className="mb-3 font-medium">
              ${book?.newPrice}
              <span className="ml-2 font-normal line-through">
                ${book?.oldPrice}
              </span>
            </p>
            <button
              onClick={() => handleAddToCart(book)}
              className="flex items-center gap-1 px-6 btn-primary"
            >
              <FiShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
