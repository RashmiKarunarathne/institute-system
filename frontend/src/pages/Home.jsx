import axios from "axios";
import {useEffect,useState} from "react";

export default function Home(){
 const [teachers,setTeachers]=useState([]);

 useEffect(()=>{
   axios.get("http://localhost:5000/teachers")
   .then(res=>setTeachers(res.data));
 },[]);

 return(
  <div>
    <h2>Teachers</h2>
    {teachers.map(t=>(
      <div key={t.id}>
        <h4>{t.name}</h4>
        <p>{t.subject}</p>
      </div>
    ))}
  </div>
 );
}
