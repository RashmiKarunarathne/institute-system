import axios from "axios";
import {useEffect,useState} from "react";

export default function ManageStudents(){

 const [students,setStudents]=useState([]);

 useEffect(()=>{
   axios.get("http://localhost:5000/students")
   .then(res=>setStudents(res.data));
 },[]);

 const del=(id)=>{
   axios.delete(`http://localhost:5000/students/${id}`)
   .then(()=>window.location.reload());
 };

 return(
  <div>
   <h2>Students</h2>
   {students.map(s=>(
     <div key={s.id}>
       {s.name}
       <button onClick={()=>del(s.id)}>Delete</button>
     </div>
   ))}
  </div>
 );
}
