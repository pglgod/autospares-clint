import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ports from '../../cloud/host.json'

export default function RecivedOrders() {

    
  const host =    ports.api_port || "http://localhost:5000/api";

    const usenavigate = useNavigate()
    const authToken = localStorage.getItem('stoken');
    const [orders, setorders] = useState("")

    useEffect(() => {
        if (!authToken) {
            alert("Please Login to see orders")
            usenavigate('/seller.dashboard/signins')
        } else {
            loadOrders();
        }
        // eslint-disable-next-line
    }, [] )

    const loadOrders = async () => {
        const res = await fetch(`${host}/order/seller/get`, {
            method: "GET",
            headers: { "auth-token": authToken }
        });
        const resp = await res.json();
        if (resp.error) {
            alert(resp.error)
        } else {
            setorders(resp.orders)
        }
    }

    
  // Load Product Detail

  function loadProdDtl(product_id) {
    sessionStorage.setItem("productId", product_id);
    usenavigate("/shop/product");
  };

    return (
        <div>

            <div className="row flex align-c j-co-sb">
                <h2>Recived Orders</h2>
            </div>

            {
                orders ? orders.map((element) => {
                    return <div className="row flex align-c j-co-sb " key={element._id} >
                        <img src={`${ports.cloudFront}/${element.product_img}`} alt="" onClick={() => loadProdDtl(element.product_id)}/>
                        <h5 style={{ width: "280px" }}>{element.name.length > 20 ? element.name.slice(0, 20) + ".." : element.name}</h5>
                        <h5 style={{ width: "200px" }}>{element.buyer_name}</h5>
                        <h5 style={{ width: "50px", textAlign:"center" }}>{element.quantity}</h5>
                        <h5 style={{ width: "125px" }}>RS.{element.price}</h5>
                        <button >Detail</button>
                    </div>
                }) : <h3 style={{ textAlign: "center", margin: "10px 0" }} >You don't recived any order</h3>
            }
        </div>
    )
}
