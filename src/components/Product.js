import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineStar } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/gapSlice";
import { ToastContainer, toast } from "react-toastify";
const Product = () => {
  const location = useLocation();

  const productData = useSelector((state) => state.gapState.productData);
  const selectedProduct = productData.find(
    (p) => p._id === location.state.product._id
  );
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const [baseQuantity, setBaseQuantity] = useState(
    selectedProduct ? selectedProduct.quantity : 1
  );
  useEffect(() => {
    setProduct(selectedProduct ? selectedProduct : location.state.product);
  }, [location, selectedProduct]);
  return (
    <div>
      <div className="max-w-screen-xl mx-auto my-10 flex gap-10">
        <div className="w-2/5 relative">
          <img
            className="w-full h-[550px] object-cover"
            src={product.image}
            alt={product.title}
          ></img>
          <div className="absolute top-4 right-0">
            {product.isNew && (
              <p className="bg-black text-white font-semibold font-titleFont px-8 py-1">
                Sale
              </p>
            )}
          </div>
        </div>
        <div className="w-3/5 flex flex-col justify-center gap-12">
          <div>
            <h2 className="text-4xl font-semibold">{product.title}</h2>
            <div className="flex items-center gap-4 mt-3">
              <p className="line-through font-base text-gray-500">
                {product.oldPrice}
              </p>
              <p className="text-2xl font-medium text-gray-900">
                {product.price}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-base">
            <div className="flex">
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
            </div>
            <p className="text-xs text-gray-500">(1 Customer Review)</p>
          </div>
          <p className="text-base text-gray-500 -mt-3">{product.description}</p>
          <div className="flex gap-4">
            <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3">
              <p className="text-sm">Quantity</p>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <button
                  onClick={() =>
                    setBaseQuantity(
                      baseQuantity === 1 ? baseQuantity : baseQuantity - 1
                    )
                  }
                  className="h-5 border font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  -
                </button>
                <span>{baseQuantity}</span>
                <button
                  onClick={() => setBaseQuantity(baseQuantity + 1)}
                  className="h-5 border font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: product._id,
                    price: product.price,
                    image: product.image,
                    description: product.description,
                    quantity: baseQuantity,
                    title: product.title,
                  })
                ) & toast.success(`${product.title} is added`)
              }
              className="bg-black text-white py-3 px-6 active:bg-gray-800"
            >
              Add to cart
            </button>
          </div>
          <p className="text-base text-gray-500">
            Category:{" "}
            <span className="font-medium capitalize">{product.category}</span>
          </p>
        </div>
      </div>
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

export default Product;
