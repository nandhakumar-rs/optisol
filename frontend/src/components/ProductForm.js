import React from 'react'
import axios from 'axios'
import Loader from 'react-loading-overlay';
import {ToastContainer,toast}  from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Redirect} from 'react-router-dom';

export default class ProductForm extends React.Component{

state = {
    productName: '',
    productCategory: 'Furniture',
    productImage: null,
    productQuantity: 0,
    productDescription: '',
    active:false,
    reDirect:false,
    imgBase64:''
}

imageSize = {
    height:'100px',
    width:'100px'
}



addProduct= async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.set('productName',this.state.productName);
    formData.set('productCategory',this.state.productCategory);
    formData.set('productImage',this.state.productImage);
    formData.set('productQuantity',this.state.productQuantity);
    formData.set('productDescription',this.state.productDescription);
    this.setState({active:true})
    const response = await axios.post("https://optisol.herokuapp.com/post-product",formData)
    if(response){
        this.setState({active:false})
        if(response.status === 200){
            
            toast.success(`${response.data.success}`,{
                position:toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
            setTimeout(()=>{
                this.setState({reDirect:true})
            },3000)
        }else{
            toast.error(`Something went Wrong`,{
                position:toast.POSITION.TOP_RIGHT
            })
        }
    }
    console.log(response);
    
}

showPreview = ()=>{
    if(this.state.imgBase64){
        return <img style={this.imageSize} className="col-sm-4 img-thumbnail" src={this.state.imgBase64} alt={this.state.productName}/>
    }else{
        return <img style={this.imageSize} className="col-sm-4 img-thumbnail"  src="Images/noImage.jpg" alt="NoImage"/>
    }
}
render(){
if(this.state.reDirect){
    return <Redirect to="/" />
}
    return(<Loader 
        active={this.state.active}
        spinner
        text='Adding a New Product'
        >
<form className="container m-2" onSubmit={(e)=>this.addProduct(e)}>
<div className="form-group  row">
<label htmlFor="name" className="col-sm-2 col-form-label">Product Name</label>
    <div className="col-sm-10">
<input required className="form-control" placeholder="Product Name" id="name"  type="text" value={this.state.productName}  onChange={(e)=>{this.setState({productName:e.target.value})}}/>
</div>
</div>
<div className="form-group  row">
<label htmlFor="category" className="col-sm-2 col-form-label">Product Category</label>
    <div className="col-sm-10">
<select required className="form-control" id="category" value={this.state.productCategory}  onChange={(e)=>{this.setState({productCategory:e.target.value})}}>
      <option value="Furniture" selected>Furniture</option>
      <option value="Vegitable">Vegitable</option>
      <option value="Fruit">Fruit</option>
    </select>
</div>
</div>
<div className="form-group  row">
<label htmlFor="quantity" className="col-sm-2 col-form-label">Product Quantity</label>
    <div className="col-sm-10">
<input required  className="form-control" id="quantity" type="number" placeholder="Product Quantity" value={this.state.productQuantity}  onChange={(e)=>{this.setState({productQuantity:e.target.value})}}/>
</div>
</div>

<div className="form-group  row">
<label htmlFor="description" className="col-sm-2 col-form-label">Product Description</label>
    <div className="col-sm-10">
<textarea required className="form-control" id="description" placeholder="Product Description" value={this.state.productDescription}  onChange={(e)=>{this.setState({productDescription:e.target.value})}}></textarea>
</div>
</div>
<div className="form-group row">
<input required className="col-sm-8" type="file" onChange={(e)=>{
    this.setState({productImage:e.target.files[0]})
    let fileReader = new FileReader()
    fileReader.onload = (img)=>{
    this.setState({imgBase64:img.target.result})
    }
    fileReader.readAsDataURL(e.target.files[0])
    }} />

{this.showPreview()}
</div>
<button type="submit" className="btn btn-primary">Add Product</button>
</form>
<ToastContainer />

    </Loader>)
}



    
}