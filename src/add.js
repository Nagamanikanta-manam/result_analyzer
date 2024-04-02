import { useState } from "react";

function Add(){
    const [g,setgrades]=useState(0);
    const [rg,setrg]=useState("")
    return <>
    <div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
   <input value={rg} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e)=>{setrg(e.target.value.toUpperCase())}}></input>
</div>
<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">No of grades</span>
   <input value={g} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e)=>{ 
    const c=e.target.value?e.target.value:0;
    setgrades(parseInt(c))}}></input>
</div>
{g? <div class="input-group">
  {Array.from({length:g},()=>{
    return  <input type="text" aria-label="First name" class="form-control"></input>
    
 
  })}

</div>
:<h3>Enter no of grades</h3>}
<button type="button" class="btn btn-primary btn-lg">Submit</button>
    </>
}
export default Add;