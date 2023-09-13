import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ports from '../../cloud/host.json'

export default function SProductList() {


  
  const host =    ports.api_port || "http://localhost:5000/api";

  const usenavigate = useNavigate();
  const authToken = localStorage.getItem('stoken')
  const [products, setproducts] = useState("")

  useEffect(() => {
    if (!authToken || authToken === null) {
      alert("Please login again to load product")
    } else { loadSellerProd(authToken) }
    // eslint-disable-next-line
  },);


  // fathing Sellers Product
  const loadSellerProd = async () => {
    fetch(`${host}/product/seller/get`, {
      method: "GET",
      headers: { "auth-token": authToken }
    }).then((res) => {
      return res.json()
    }).then((resp) => {
      if (resp.error) {
        alert("Error : " + resp.error)
      } else {
        setproducts(resp.products)
      }
    })
  };


  // Load Product Detail

  function loadProdDtl(_id) {
    sessionStorage.setItem("productId", _id);
    usenavigate("/shop/product");
  };


  // remove a product
  function removeProduct(_id) {
    console.log(_id)
    fetch(`${host}/product/seller/delete`, {
      method: "DELETE",
      headers: {
        "auth-token": authToken,
        "id": _id
      }
    }).then((res) => {
      return res.json()
    }).then((resp) => {
      if (resp.error) {
        // alert( "Error" + resp.error )
      } else {
        alert(resp.msg)
      }
    })
    loadSellerProd(authToken);
  };


  return (
    <>

      <div className="row flex align-c j-co-sb">
        <h2>All Products</h2>
      </div>


      {
        products ? products.map((element) => {
          return (
            <div className="row flex align-c j-co-sb " key={element._id} >
              <img src={`${ports.cloudFront}/${element.productImg}`} alt=""  onClick={() => loadProdDtl(element._id)} />
              <h5 style={{ width: "280px" }}>{element.name.length>20 ? element.name.slice(0, 20)+"..": element.name}</h5>
              <h5 style={{ width: "150px" }}>{element.brand}</h5>
              <h5 style={{ width: "150px" }}>{element.category}</h5>
              <h5 style={{ width: "125px" }}>RS.{element.price}</h5>
              <button onClick={() => removeProduct(element._id)}>Delete</button>
            </div>
          )
        }) : <h3 style={{ textAlign: "center", margin: "10px 0" }} >You don't have any products to sell</h3>
      }
    </>
  );
}
