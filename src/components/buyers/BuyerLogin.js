import React, {useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import appContext from '../../contexts/appState/appContext';



export default function BuyerLogin() {

  const context = useContext(appContext);
  const { buyerSignIn } = context;


  const [cred, setcred] = useState({ email: "", password: "" })

  const handleChange = (e)=>{
    setcred({ ...cred, [e.target.name] : e.target.value })
  }

  useEffect(()=>{
    sessionStorage.setItem('loginToken', " ")
  })





  const proseedLogin =(e)=>{
    e.preventDefault()
    if (validatinon(true)) {
      buyerSignIn( cred.email, cred.password );
    }
    
  }


  const validatinon = ()=>{
    let result = true;
    if (cred.email === '' || cred.email === null) {
      result = false;
      alert("enter email id");
    }
    if (cred.password === "" || cred.password === null) {
      result = false;
      alert("Enter your password!");
    }
    return result;
  }

  return (
    <div>
      
      <div className="seller-signin-cnt flex align-c ">
        <h1>LogIn Here To Start Shoping :-) </h1>
        <form className="seller-signin-form flex align-c" onSubmit={proseedLogin}  action="">
            <h2>Login Here!</h2>
            <div className="text-input-feild">
                <input type="email" placeholder='Enter Your Email' name='email' value={cred.email} onChange={handleChange}   required/>
            </div>
            <div className="text-input-feild ">
                <input type="password"  placeholder='Enter Your Password' name='password' value={cred.password} onChange={handleChange} required/>
                <div className='flex align-c' style={{marginTop:"10px", gap:"10px"}}>
                    <p>Show Password</p>
                    <input type="checkbox" id="showPassCheck"/>
                </div>
            </div>
            <div className="text-input-feild flex align-c j-co-center">
                <Link to="/">Forget Password?</Link>
            </div>
            <div className="text-input-feild flex align-c j-co-center">
                <input type="submit" value="L O G I N" />
            </div>
            <div className="text-input-feild">
                <p>Not a seller ? <Link to="/buyer/signup" >click here</Link></p>
            </div>

        </form>


      </div>
    </div>
  )
}
