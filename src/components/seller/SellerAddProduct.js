import React, { useState } from 'react';


export default function SellerAddProduct() {


  // const { authToken } = props
  const authToken = localStorage.getItem('stoken')
    
  const [addProd, setaddProd] = useState({ name: "", brand: "", category: "", price: "", description: "", SKU: "", tag: "" })
  const [productImg, setproductImg] = useState("")
    
  const handleChange = (e) => {
    setaddProd({ ...addProd, [e.target.name]: e.target.value })
  }
  const handleUploads = (e) => {
    setproductImg(e.target.files[0])
  }

  // Posting A product
  const postProduct = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("productImg", productImg)
    formData.append("name", addProd.name)
    formData.append("brand", addProd.brand)
    formData.append("category", addProd.category)
    formData.append("price", addProd.price)
    formData.append("description", addProd.description)
    formData.append("SKU", addProd.SKU)
    formData.append("tag", addProd.tag)

    const res = await fetch(`http://localhost:5000/api/product/add`, {
      method: "POST",
      headers: { "auth-token": authToken },
      body: formData
    });
    const resp = await res.json();
    if (resp.error) {
      alert("Error : " + resp.error)
    } else {
      alert(resp.msg);
      setaddProd({name: "", brand: "", category: "", price: "", description: "", SKU: "", tag: "" })
      setproductImg('')
    };

  }

  return (
    <div>
      
      <div className="row flex align-c j-co-sb">
        <h2>Add Product</h2>
      </div>
      <div className="row flex align-c" >
        <form action="" className="add-product flex align-c j-co-center" onSubmit={postProduct} >
          <input type="file" id="imgUrl" name="productImg" onChange={handleUploads} required />
          <input type="text" placeholder='Product Name' name="name" value={addProd.name} onChange={handleChange} required />
          <input type="text" placeholder='Brand Name' name="brand" value={addProd.brand} onChange={handleChange} required />
          <input type="text" placeholder='Category' name="category" value={addProd.category} onChange={handleChange} required />
          <input type="number" placeholder='Price' name="price" value={addProd.price} onChange={handleChange} required />
          <input type="text" placeholder='Description' name="description" value={addProd.description} onChange={handleChange} required />
          <input type="text" placeholder='Tag' name="tag" value={addProd.tag} onChange={handleChange} required />
          <input type="text" placeholder='SKU' name="SKU" value={addProd.SKU} onChange={handleChange} required />
          <input type="submit" value="Add Product" />
        </form>
      </div>
    </div>
  )
}
