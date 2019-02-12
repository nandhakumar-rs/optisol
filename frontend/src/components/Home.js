import React from 'react';
import axios from 'axios';
import Products from './Products'
import SearchBar from './SearchBar'
import {NavLink} from 'react-router-dom'

export default class Home extends React.Component{
state = { 
    allProducts:[],
    searchTerm:'',
    searchProducts:[]
}
getSearchTerm = (searchTerm)=>{
debugger;
this.setState({searchTerm:searchTerm})
    if(this.state.allProducts.length > 0 && searchTerm){
      this.setState({searchProducts:this.state.allProducts.filter((data)=>data.productCategory.toLowerCase() === searchTerm.toLowerCase())
      })}else{
          this.setState({searchProducts:[]})
      }

}
getAllProducts = async()=>{
    const products = await axios.get("https://optisol.herokuapp.com/get-all-products")
    this.setState({allProducts:products.data.data})
}

searchFor(){
    if(this.state.searchTerm)
    return (<p>Search For : "{this.state.searchTerm}"</p>)
    else
    return;
}
componentDidMount(){
    this.getAllProducts();
}

viewAllProducts(){
    if(this.state.searchTerm.length === 0){
        console.log(this.state.searchTerm.length)
        return(<div className="card-columns m-3">
        <Products product = {this.state.allProducts} />
        </div>)
    }else{
        if(this.state.searchProducts.length === 0){
            return(
                <div className="row m-3">
                <div className="col-sm-10"><p> No Result Found</p></div>
                </div>)
        }
        return(<div className="card-columns m-3">
        <Products product = {this.state.searchProducts} />
        </div>)
    }
}

render(){
if(this.state.allProducts.length > 0)
return(
    <div>
<div className="container"><SearchBar search={this.getSearchTerm} />
</div>
<div className="row"><div className="col-sm-10"><p className="m-3"> Available Categories are : Vegetables, Furniture, Fruits</p></div>
<div className="col-sm-2"><NavLink className="btn btn-success" to="/add">Add Product</NavLink>
</div>
</div>
<div className="m-3">{this.searchFor()}</div>
{this.viewAllProducts()}
</div>)
else
return(<div>
    <div className="row">
    <div className="col-sm-10"><p className="m-3"> No Products</p></div>
    <div className="col-sm-2">
    <NavLink className="btn btn-success" to="/add">Add Product</NavLink>
    </div>
    </div>
    </div>)
}



}
