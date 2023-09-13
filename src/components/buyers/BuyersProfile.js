import React, { useEffect, useContext, useState } from 'react'
import { useNavigate, Link, useLocation, Outlet } from 'react-router-dom';
import { useCollapse } from 'react-collapsed';
import appContext from '../../contexts/appState/appContext';



export default function BuyersProfile() {

    const location = useLocation();
    const usenavigate = useNavigate();
    const context = useContext(appContext);
    const { buyer, getBuyerDtl } = context;

    const [isExpanded, setisExpanded] = useState(false);
    const { getToggleProps, getCollapseProps } = useCollapse({ isExpanded });
    const handleColap = () => {
        setisExpanded(!isExpanded)
    }

    useEffect(() => {
        if (!buyer) {
            usenavigate('/buyer/login')
        } else {
            getBuyerDtl();
        }
        // eslint-disable-next-line
    }, [])

    const logOut = () => {
        localStorage.removeItem('btoken');
        usenavigate('/buyer/login');
    }

    return (
        <div >
            <div className='flex j-co-center JFGHhb' >

                    <div className="dash-menubar">
                        <div className="dash-great flex align-c j-co-sb ">
                            <div className=' pgreet flex align-c '>
                                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="img" />
                                <div>
                                    <p>Hello,</p>
                                    <h4>{buyer.name}</h4>
                                </div>
                            </div>
                            <div>
                                <input type="checkbox" id="Pcheckbox" />
                                <label htmlFor="Pcheckbox" className="Ptoggle" {...getToggleProps({ onClick: handleColap })} >
                                    <div className="bars" id="bar1"></div>
                                    <div className="bars" id="bar2"></div>
                                    <div className="bars" id="bar3"></div>
                                </label>
                            </div>
                        </div >

                        <div className="colap-profile" {...getCollapseProps()} >
                            <div className='colap-cnt'>
                                <div>
                                    <p className="pcolable">E-Mail</p>
                                    <p className="pcolmain">{buyer.email}</p>
                                </div>
                                <div>
                                    <p className="pcolable">Phone No</p>
                                    <p className="pcolmain">{buyer.phone}</p>
                                </div>
                                <div>
                                    <p className="pcolable">Shope Address</p>
                                    <p className="pcolmain">{buyer.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className='dash-menu' >
                            <ul className='flex flex-col'>
                                <li><Link to="" className={location.pathname === "/buyer" ? "active-brad" : "desabled-brad"} >My Orders</Link></li>
                                <li><Link to="add_product" className={location.pathname === "/buyer/wishlist" ? "active-brad" : "desabled-brad"} >My Wishlist</Link></li>
                                <li><Link to="recived_orders" className={location.pathname === "/buyer/payments" ? "active-brad" : "desabled-brad"} >Payments</Link></li>
                                <li><Link to="recived_orders" className={location.pathname === "/buyer/gift_card" ? "active-brad" : "desabled-brad"} >Gift Cards</Link></li>
                                <li><Link to="recived_orders" className={location.pathname === "/buyer/track_order" ? "active-brad" : "desabled-brad"} >Track Orders</Link></li>
                                <li><button onClick={logOut} >Log Out</button></li>
                            </ul>
                        </div>
                    </div>

                <div className='dash-con-cnt' >
                    <div className="dash-content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
