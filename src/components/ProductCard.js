import React from 'react';
import { useNavigate } from 'react-router-dom';
import ports from '../cloud/host.json'

export default function ProductCard(props) {

  const { prodId, productImg, productName, brand, price } = props
  const usenavigate = useNavigate();

  const loadProdDtl = () => {
    usenavigate('/shop/product');
    sessionStorage.setItem("productId", prodId);
    console.log(sessionStorage.getItem("productId"));
  }
  return (
    <div className="product-card Shop-product-card" onClick={loadProdDtl}>
      <img src={`${ports.cloudFront}/${productImg}`} alt="img" />
      <p>{productName.length > 25 ? productName.slice(0, 25)+"..." : productName }</p>
      <p>brand: {brand} </p>
      <h3>RS. {price}</h3>
    </div>

  )
}
