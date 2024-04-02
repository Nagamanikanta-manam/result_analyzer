import React,{useState} from "react";
import {Link} from "react-router-dom";
import "./header.css"
const Header=()=>{
    return <div class="header">
    <h1>Result Analyzer</h1>
    <div>
    <Link to='/' ><button type="button" class="btn btn-outline-primary hi">Home</button></Link>
    <Link  to='/add'><button type="button" class="btn btn-outline-primary hi">Add Regulation</button></Link>
    </div>
    </div> 
}
export default Header