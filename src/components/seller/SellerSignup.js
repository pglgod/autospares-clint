import React,{ useState, useContext } from 'react';
import appContext from '../../contexts/appState/appContext';

export default function SellerSignup() {

  
  const context = useContext(appContext);
  const { sellerSignUp } = context;
  

  const [credential, setcredential] = useState( { name: "", email: "", phone: "", password: "", conPass: "",  shope: "", address: "" } )

  const handleChange = (e)=>{
    setcredential({...credential, [e.target.name] : e.target.value })
  };


  const proseedSellerSingup = (e)=>{
    e.preventDefault();
    if (validation(true)) {
      sellerSignUp( credential.name, credential.email, credential.phone, credential.password, credential.shope, credential.address );
      
    }

  }

  const validation = ()=>{
    let result;
    if (credential.name === "" || credential.name === null) {
      result=false;
      alert("Enter Your Name!")
    }
    else if (credential.email === "" || credential.email === null){
      result=false;
      alert('Enter Your Email')
    }
    else if (credential.phone === "" || credential.phone === null) {
      result = false;
      alert("Enter Phone Number");
    }
    else if (credential.shope === '' || credential.shope === null) {
      result = false;
      alert("Please Enter Shope Name")
    }
    else if (credential.address === "" || credential.address === null) {
      result = false;
      alert("Address Is Required");
    }
    else if (credential.password === '' || credential.password === null ) {
      result = false; 
      alert("Password is required!");
    }
    else if (credential.password !== credential.conPass) {
      result = false;
      alert("Confirm Password Doesn't Match.");
    }
    else if ( document.getElementById('sellerPolices').checked === false) {
      result = false;
      alert("You must accept our police after you can continue.")
    }
    else{
      result = true;
    }
    return result;
  };



  return (
    <div>
      <div className="seller-signup-cnt flex align-c ">
        <h1>Want to Grow your bussines?</h1>
        <form className="seller-signup-form flex align-c j-co-center" onSubmit={proseedSellerSingup} >
            <h2>Register Here To Become Seller</h2>
            <div className="input-feild-row flex align-c j-co-center">
                <input type="text" placeholder='Enter Your Full Name' name='name' value={credential.name} onChange={handleChange}/>
                <input type="email" id="sellerInEmail" placeholder='Enter Your Email' name='email' value={credential.email} onChange={handleChange} />
            </div>
            <div className="input-feild-row flex align-c j-co-center">
                <input type="text" placeholder='Shop Name' name='shope' value={credential.shope} onChange={handleChange}/>
                <input type="text" maxLength={10} placeholder='Phone Number' name='phone' value={credential.phone} onChange={handleChange}/>
            </div>
            <div className="input-feild-row ">
                <input type="text" name="address" id="sellerAddress"  placeholder='Enter Your Shope Address'  value={credential.address} onChange={handleChange}/>
            </div>
            <div className="input-feild-row flex align-c j-co-center">
                <input type="text" placeholder='Create Password' name='password' value={credential.password} onChange={handleChange}/>
                <input type="password" placeholder='Conferm Password' name='conPass' value={credential.conPass} onChange={handleChange}/>
            </div>
            <div className="input-feild-row flex align-c  ">
                <p>Read our <span>terms</span>  & <span>privacy polices</span> </p>
                <input type="checkbox" name="" id="sellerPolices"  />
            </div>
            <div className="input-feild-row ">
                <input type="submit" value="R E G I S T E R" />
            </div>
        </form>
      </div>
    </div>
  )
}
