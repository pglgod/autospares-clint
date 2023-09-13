import React, { useEffect, useContext } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import appContext from '../../contexts/appState/appContext';


export default function SellerDashboard() {

  const usenavigate = useNavigate();
  const location = useLocation()
  const context = useContext(appContext);
  const { seller, getSellerDtl } = context;
  const stoken = localStorage.getItem('stoken');


  // Logout Function
  const logOutSeller = () => {
    localStorage.removeItem('stoken')
    usenavigate("/seller.dashboard/signin");
  }

  useEffect(() => {
    if (stoken === " " || stoken === null) {
      usenavigate("/seller.dashboard/signin");
    }
    else { getSellerDtl() }
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>

      <div className='flex j-co-center JFGHhb' >
        <div className="dash-menubar">
          <div className="dash-great flex align-c  ">
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="img" />
            <div>
              <p>Hello,</p>
              <h4>{seller.name}</h4>
            </div>
          </div >

          <div className='dash-menu' >
            <ul className='flex flex-col'>
              <li><Link to="" className={location.pathname === "/seller.dashboard"? "active-brad": "desabled-brad"} >My Products</Link></li>
              <li><Link to="add_product" className={location.pathname === "/seller.dashboard/add_product"? "active-brad": "desabled-brad"} >Add Product</Link></li>
              <li><Link to="recived_orders" className={location.pathname === "/seller.dashboard/recived_orders"? "active-brad": "desabled-brad"} >Recived Orders</Link></li>
              <li><button onClick={logOutSeller} >Log Out</button></li>
            </ul>
          </div>
        </div>
        
        <div className='dash-con-cnt' >
          <div className="dash-profile">
            <div className="row flex align-c j-co-sb">
              <h2>Seller Information</h2>
            </div>
            <div className='row flex align-c ' >
              <div style={{ width: "40%" }} >
                <label>Name :</label>
                <p>{seller.name}</p>
              </div>
              <div>
                <label>Shope :</label>
                <p>{seller.shope}</p>
              </div>
            </div>
            <div className='row flex align-c ' >
              <div style={{ width: "40%" }} >
                <label>Email :</label>
                <p>{seller.email}</p>
              </div>
              <div>
                <label>Phone</label>
                <p>{seller.phone}</p>
              </div>
            </div>
            <div className="row">
              <div>
                <label>Address :</label>
                <p>{seller.address}</p>
              </div>
            </div>
          </div>
          <div className="dash-content">
            <Outlet/>
          </div>
        </div>
      </div>

    </div>
  )
}
