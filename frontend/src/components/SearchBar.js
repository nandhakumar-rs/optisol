import React from 'react';



export default class SearchBar extends React.Component{
state = {searchTerm:''}

searchTerm = ()=>{
this.props.search(this.state.searchTerm)
}


    render(){
        return(<div className="input-group mb-3">
        <input type="text" className="form-control" value={this.state.searchTerm} onChange={(e)=>this.setState({searchTerm:e.target.value})} placeholder="Search based On Category" aria-label="Search based On Category" aria-describedby="basic-addon2" />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={this.searchTerm}>Search</button>
        </div>
      </div>)

    }
}



