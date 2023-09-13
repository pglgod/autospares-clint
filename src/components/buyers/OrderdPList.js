import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import appContext from '../../contexts/appState/appContext';
import ports from '../../cloud/host.json'


export default function OrderdPList() {

  const usenavigate = useNavigate()

  const context = useContext(appContext)

  const { buyer, bOrders, buyerOrders } = context;
  useEffect(() => {
    if (!buyer) {
      usenavigate('/buyer/login')
    } else {
      buyerOrders()
    }
    // eslint-disable-next-line
  }, [])


  
  function loadProdDtl(product_id) {
    sessionStorage.setItem("productId", product_id);
    usenavigate("/shop/product");
  };


  return (
    <div>

      <div className="row">
        <h2>My Orders</h2>
      </div>

      {
        bOrders.orders ? bOrders.orders.map((element) => {
          return (
            <div className="row flex align-c j-co-sb "  >
              <img src={`${ports.cloudFront}/${element.product_img}`} alt="" onClick={() => loadProdDtl(element.product_id)} />
              <h5 style={{width: "280px"}}>{element.name.length > 20? element.name.slice(0, 20)+"..." : element.name}</h5>
              <h5 style={{width: "200px"}}>{element.brand}</h5>
              <h5 style={{width: "50px"}}>{element.quantity}</h5>
              <h5 style={{width: "125px"}}>RS.{element.price}</h5>
              <button>Cancle</button>
            </div>
          )
        }) : <h1>You do not pleased any order</h1>
      }
    </div>
  )
}
