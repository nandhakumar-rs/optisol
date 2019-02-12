import React from 'react'

const Products = (props)=>{

const product = props.product.map(data=>{
    return(  <div key={data._id} className="card">
    <img className="card-img-top" width='100px' height='200px' src={data.productImage} alt={data.productName} />
    <div className="card-body">
      <h5 className="card-title">{data.productName}</h5>
      <p className="card-text">{data.productDescription}</p>
    </div>
    <div className="card-footer bg-transparent border-success">
    <p className="card-text">Quantity : {data.productQuantity}</p>
    <p className="card-text">Category : {data.productCategory}</p>
    </div>

    </div>)

})

   

return <div>{product}</div>


}


export default Products;