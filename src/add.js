import { useState } from "react";

function Add(){
    const [g,setgrades]=useState(null);
    return <>
    <div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
   <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></input>
</div>
<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">No of grades</span>
   <input value={g} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e)=>{ 
    const c=e.target.value?e.target.value:0;
    setgrades(parseInt(c))}}></input>
</div>
{g? <div class="input-group">
hi
</div>
:<h3>Enter no of grades</h3>}
    </>
}
export default Add;