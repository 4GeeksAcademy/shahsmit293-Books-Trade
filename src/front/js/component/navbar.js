import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  console.log("STORE***",store)
  const navigate = useNavigate()


  useEffect(()=>{
    actions.updateStoreFromStorage();
    },[store.accessToken])

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div className="logo-container">
          <Link to="/">
            <img
              src={`https://icon2.cleanpng.com/20180318/tlq/kisspng-bookcase-cartoon-books-on-a-bookshelf-5aae55a61086b3.2887318115213746300677.jpg`}
              alt="Logo"
              className="logo-image"
            />
          </Link>
          <p className="logo-text">ShelfShare</p>
          <p className="About-text">
            <b>About Us</b>
          </p>
        </div>
          <div
            className="ml-auto"
            style={{ display: "flex", flexDirection: "row" }}
          >
              {store.accessToken?
              <div className="d-flex align-items-center justify-content-center">
                    <div className = "usernavb">                      
                    <p><b>{"😊 Hello, " + store?.user.first_name +"! How about a book 📚 today?"}</b></p>
                    </div>
                    <div>  
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => {
                          actions.handleLogout()
                        }}
                      >
                        <b>Logout</b>
                      </button>
                    </div>
              </div>
              :
              <div  className="ml-auto"
              style={{ display: "flex", flexDirection: "row" }}>          
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    <b>Login</b>
                  </button>
  
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    <b>Signup</b>
                  </button>
              </div>
            }
          </div>
      </div>
    </nav>
  );
};
