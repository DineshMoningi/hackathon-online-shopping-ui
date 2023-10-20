import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
const Cart = () => {
  const navigate = useNavigate();
  const productData = useSelector((state) => state.gapState.productData);
  const userInfo = useSelector((state) => state.gapState.userInfo);
  const [paynow, setPaynow] = useState(false);
  const [totalAmout, setTotalAmount] = useState(0);
  useEffect(() => {
    let price = 0;
    productData.map((p) => {
      price += p.price * p.quantity;
      return price;
    });
    setTotalAmount(price);
  }, [productData]);

  const handleCheckout = () => {
    if (userInfo) {
      setPaynow(true);
    } else {
      toast.error("Please sign-in to Checkout");
      navigate("/login");
    }
  };
  return (
    <div>
      <img
        className="w-full h-60 object-cover"
        src="https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="cartImg"
      />
      {productData.length > 0 ? (
        <div className="max-w-screen-xl mx-auto py-20 flex">
          <CartItem productData={productData} />
          <div className="w-1/3 bg-[#fafafa] py-6 px-4">
            <div className=" flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
              <h2 className="text-2xl font-medium ">Cart Totals</h2>
              <p className="flex items-center gap-4 text-base">
                Subtotal{" "}
                <span className="font-titleFont font-bold text-lg">
                  $ {totalAmout.toFixed(2)}
                </span>
              </p>
              <p className="flex items-start gap-4 text-base">
                Shipping Address
                <span>
                  Headquarters, San Francisco, California, United States ;
                  Contact Number, (650)952-4400
                </span>
              </p>
            </div>
            <p className="font-titleFont font-semibold flex justify-between mt-6">
              Total{" "}
              <span className="text-xl font-bold">
                $ {totalAmout.toFixed(2)}
              </span>
            </p>
            <button
              onClick={handleCheckout}
              className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300"
            >
              Proceed to Checkout
            </button>
            {paynow && (
              <div className="w-full mt-6 flex items-center justify-center">
                <StripeCheckout
                  stripeKey="pk_test_51NhB8fSBlKzyG28CqoIDPAxcNJytw1jC2nhTAXs9OegYmJoMaokFqoQvQDeUWQxoVzMyIomDjRgbcuNG6ZFoAaA100HIeRYNlQ"
                  name="Gap Online Shopping"
                  amount={totalAmout * 100}
                  label="Pay to Gap"
                  description={`Your payment amoutn ${totalAmout}`}
                  // token={}
                  email={userInfo.email}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto py-10 flex flex-col items-center gap-2 justify-center">
          <p className="text-xl text-orange-600 font-titleFont font-semibold">
            Your Cart is Empty. Please go back to Shopping and add products to
            Cart.
          </p>
          <Link to="/">
            <button className="flex items-center gap-1 text-gray-400 hover:text-black duration-300">
              <span>
                <HiOutlineArrowLeft />
              </span>
              go shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
