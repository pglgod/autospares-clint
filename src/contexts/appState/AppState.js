

import React, { useState } from "react";
import appContext from "./appContext";
import { useNavigate } from "react-router-dom";
import ports from '../../cloud/host.json';

const AppState = (props) => {


    const usenavigate = useNavigate();

    const host =    ports.api_port || "http://localhost:5000/api";

    // const host =    

    const setInitial = []

    // Sellers State
    const [seller, setSeller] = useState(setInitial);
    // Seller SignUp
    const sellerSignUp = async (name, email, phone, password, shope, address) => {
        const res = await fetch(`${host}/seller/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, password, shope, address })
        });
        const resp = await res.json()
        if (resp.error) {
            alert(resp.error);

        } else if (resp.errors) {
            alert("Error : " + resp.errors[0].msg)
            console.log(resp.errors[0].msg)
        }
        else {
            alert("You have successfully signed up");
            usenavigate('/seller.dashboard/signin')
        }
    };

    // Seller SignIn
    const sellerLogIn = async (email, password) => {
        const res = await fetch(`${host}/seller/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const resp = await res.json();
        if (resp.error) {
            alert("Error : " + resp.error)
        } else if (resp.errors) {
            alert("Error : " + resp.errors)
        } else {
            alert("Successfully Loged-In");
            localStorage.setItem('stoken', resp.authToken);
            usenavigate('/seller.dashboard')
        }
    }

    // get seller detail
    const getSellerDtl = async () => {
        const authToken = localStorage.getItem("stoken");
        const res = await fetch(`${host}/seller/get`, {
            method: "POST",
            headers: { "auth-token": authToken }
        });
        const resp = await res.json();
        if (resp.error) {
            alert('failed to load seller information')
            usenavigate('/seller.dashboard/login')
        }
        else {
            setSeller(resp)
        }
    }

    



    // Buyer States 
    const [buyer, setBuyer] = useState(setInitial);
    // Buyer SignUp
    const buyerSignUp = async (name, email, phone, password, address) => {
        const res = await fetch(`${host}/buyer/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, address, password })
        });
        const resp = await res.json();
        if (resp.error) {
            alert(resp.error);

        } else if (resp.errors) {
            alert("Error : " + resp.errors[0].msg)
            console.log(resp.errors[0].msg)
        }
        else {
            alert("You have successfully signed up");
            usenavigate('/buyer/login')
        }
    }

    // Buyer SignIn
    const buyerSignIn = async (email, password) => {
        const res = await fetch(`${host}/buyer/login`, {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const resp = await res.json();
        if (resp.error) {
            alert(resp.error);

        } else if (resp.errors) {
            alert("Error : " + resp.errors[0].msg)
            console.log(resp.errors[0].msg)
        }
        else {
            alert("LogedIn Successfully");
            localStorage.setItem('btoken', resp.authToken);
            usenavigate('/buyer')
        }
    };

    // Get Buyer Detail
    const getBuyerDtl = async () => {

        const authToken = localStorage.getItem("btoken");
        if (!authToken) {
            usenavigate('/buyer/login')
        } else {
            const res = await fetch(`${host}/buyer/get`, {
                method: "POST",
                headers: { "auth-token": authToken }
            });
            const resp = await res.json();
            if (resp.error) {
                alert(resp.error);
            }else{
                setBuyer(resp)
            }
        }
    }


    // Fetch Buyer Orders
    const [bOrders, setbOrders] = useState(setInitial);
    const buyerOrders = async ()=>{
        const authToken=localStorage.getItem("btoken");

        const res = await fetch(`${host}/order/buyer/get`, {
            method: "GET",
            headers:{ "auth-token" : authToken }
        });
        const resp = await res.json();
        if (resp.error) {
            alert(resp.error)
        }else{
            setbOrders(resp)
        }
    }


    // Fetch All Product
    const [allProducts, setallProducts] = useState(setInitial);
    const getAllProduct = async ()=>{
        const res = await fetch(`${host}/product/all`, {
            method:"GET"
        });
        const resp = await res.json();

        if (resp.error) {
            alert(resp.error)
        }
        else{
            setallProducts(resp.products)
        }
    }







    return (
        <appContext.Provider value={{ seller, sellerSignUp, sellerLogIn, getSellerDtl, buyer, buyerSignUp, buyerSignIn, getBuyerDtl, allProducts, getAllProduct, bOrders, buyerOrders }} >
            {props.children}
        </appContext.Provider>
    )

};

export default AppState;

