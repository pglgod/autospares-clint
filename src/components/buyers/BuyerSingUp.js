import React, {useState, useContext} from 'react';
import appContext from '../../contexts/appState/appContext';

export default function BuyerSingUp() {


const context = useContext(appContext)

const { buyerSignUp } = context;

const [buyer, setbuyer] = useState( { name:"", email: "", phone: "", address: "", password: "", conPass: "" } )


  const handleChange = (e)=>{
    setbuyer({ ...buyer, [e.target.name] : e.target.value })
  }

  const validation = ()=>{
    let result = true;
    if (buyer.password !== buyer.conPass) {
      result = false;
      alert("Passwords do not match")
    }
    if ( document.getElementById('sellerPolices').checked === false) {
      result = false;
      alert("You must accept our policy before you can continue.")
    }
    return result;
  }


  const proseedSignUp = (e)=>{
      e.preventDefault();
      if(validation(true)){
        buyerSignUp( buyer.name, buyer.email, buyer.phone, buyer.password, buyer.address )
      } else{
        alert('SignUp Failed!');
      }

  }




  return (
    <div>
      <div className="seller-signup-cnt flex align-c ">
        <h1>Register in AutoSpare.com to Start purchasing </h1>
        <form className="seller-signup-form flex align-c j-co-center" onSubmit={proseedSignUp} action="">
            <h2>Register as Buyer</h2>
            <div className="input-feild-row ">
                <input type="text" id='buyerName'  placeholder='Enter Your Full Name' name='name' value={buyer.name} onChange={handleChange} required/>
            </div>
            <div className="input-feild-row flex align-c j-co-center">
                <input type="email" id="sellerInEmail" placeholder='Enter Your Email' name='email' value={buyer.email} onChange={handleChange}  required/>
                <input type="text" maxLength={10} placeholder='Phone Number' name='phone' value={buyer.phone} onChange={handleChange} required/>
            </div>
            <div className="input-feild-row flex align-c j-co-center">
                <input type="text" placeholder='Create Password' name='password' value={buyer.password} onChange={handleChange} required/>
                <input type="password" name='conPass' placeholder='Conferm Password'value={buyer.conPass} onChange={handleChange} required/>
            </div>
            <div className="input-feild-row ">
                <input type="text" name="address" id="sellerAddress" placeholder='Enter Your Shipping Address' value={buyer.address} onChange={handleChange}  required/>
            </div>
            <div className="input-feild-row flex align-c  ">
                <p>Read our <span>terms</span>  & <span>privacy policy</span> </p>
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
