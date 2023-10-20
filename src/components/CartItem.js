import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
  resetCart,
} from "../redux/gapSlice";
import { useDispatch } from "react-redux";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";

const CartItem = ({ productData }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-2/3 pr-10">
      <div className="w-full">
        <h2 className="font-titleFont text-2xl">Shopping Cart</h2>
      </div>
      <div>
        {productData.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between gap-6 mt-6"
          >
            <div className="flex items-center gap-2">
              <MdOutlineClose
                onClick={() =>
                  dispatch(deleteFromCart(product._id)) &
                  toast.error(`${product.title} is removed`)
                }
                className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-600"
              />
              <img
                className="w-32 h-32 object-cover"
                src={product.image}
                alt={product.title}
              />
            </div>
            <h2 className="w-52">{product.title}</h2>
            <p className="w-10">{product.price}</p>
            <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3">
              <p className="text-sm">Quantity</p>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <button
                  onClick={() =>
                    dispatch(
                      decrementQuantity({
                        _id: product._id,
                        image: product.image,
                        quantity: product.quantity,
                        description: product.description,
                        title: product.title,
                      })
                    )
                  }
                  className="h-5 border font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(
                      incrementQuantity({
                        _id: product._id,
                        image: product.image,
                        quantity: product.quantity,
                        description: product.description,
                        title: product.title,
                      })
                    )
                  }
                  className="h-5 border font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  +
                </button>
              </div>
            </div>
            <p className="w-10">
              {(product.price * product.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          dispatch(resetCart()) & toast.error("Your cart is Empty!")
        }
        className="bg-red-500 text-white mt-8 ml-7 py-1 px-6 hover:bg-red-800"
      >
        Reset Cart
      </button>
      <Link to="/">
        <button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300">
          <span>
            <HiOutlineArrowLeft />
          </span>
          Go shopping
        </button>
      </Link>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default CartItem;
