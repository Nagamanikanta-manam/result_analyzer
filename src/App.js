import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import { useState,useRef } from "react";
import * as XLSX from "xlsx";
import { BrowserRouter,Route,Routes } from "react-router-dom";
function App() {
  const [subc,setsubc]=useState(null);
  const [ef, setef] = useState(null);
  const [ed, seted] = useState(null);
  const [fd,setfd]=useState(null);
  const fileUp = (e) => {
    let selected = e.target.files[0];
    if (selected) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selected);
      reader.onload = (e) => {
        setef(e.target.result);
      };
    }
  };

  const submit = (e) => {
    e.preventDefault();
    
    if (ef !== null) {
      const workbook = XLSX.read(ef, { type: "buffer" });
      const sheetN = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetN];
      const data = XLSX.utils.sheet_to_json(worksheet);

      seted(data);
      const scodes = Object.keys(data[0]);
      const len = scodes.length;
      const sdf = {};
      
      for (var i = 0; i < len; i++) {
        sdf[scodes[i]] = { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0 };
      }
      setsubc(Object.keys(data[0]));  
      for ( i = 2; i < data.length; i++) {
        const subs=Object.keys(data[i])
        
        for (var j = 0; j < scodes.length; j++) {
         
          if(subs.includes(scodes[j])){
            
          sdf[scodes[j]][data[i][scodes[j]]] += 1;
          }
        }
      }

      setfd(sdf);
    }
  };
  const pdf=useRef(null);
  const dpdf=(e)=>{
    e.preventDefault();
    const input=pdf.current;
    html2canvas(input).then((canvas)=>{
        const imageDATa=canvas.toDataURL('img/png');
        const pdf2 = new jsPDF('p', 'mm', 'a4');
        pdf2.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
        pdf2.save('table.pdf');
    })
  }
  
  return (
    <div className="App">
      <form className="form">
        <div className="mb-3">
          <input className="form-control" type="file" id="formFile" onChange={fileUp} />
        </div>
        <button type="submit" className="btn btn-primary mb-3" onClick={submit}>Upload</button>
      </form>
      {ed ?
      <div>
     <div className="dn"> <button  className="btn btn-primary mb-3" onClick={dpdf}>Download Pdf</button></div>
        <table className="table table-striped table-hover th" ref={pdf}>
          <thead>
            <tr>
              <th scope="col">Subject</th>
              <th scope="col">A+</th>
              <th scope="col">A</th>
              <th scope="col">B</th>
              <th scope="col">C</th>
              <th scope="col">D</th>
              <th scope="col">E</th>
              <th scope="col">F</th>
            </tr>
          </thead>

          <tbody>
            {Object.values(ed[0]).map((data, index) => {
              return <tr >
                <td>{data.trim()}</td>
                <td>{fd[subc[index]]['A+']}</td>
                <td>{fd[subc[index]]['A']}</td>
                <td>{fd[subc[index]]['B']}</td>
                <td>{fd[subc[index]]['C']}</td>
                <td>{fd[subc[index]]['D']}</td>
                <td>{fd[subc[index]]['E']}</td>
                <td>{fd[subc[index]]['F']}</td>
              
              </tr>;
            })}
          </tbody>
        </table></div> :
        <div className="text-bg-warning p-3 tec">Please upload an excel sheet!</div>}
    </div>
  );
}

export default App;
