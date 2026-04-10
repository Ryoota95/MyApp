
import { useEffect, useState } from "react";
import ThreadList from "../component/threadlist";
import Mainlayout from "../layouts/layout";
import CreateThread from "../component/createthread";


export default function Dashboard() {
 

  const [threads, setThreads] = useState([]);
  

   console.log(threads);
    

    useEffect(() => {
        fetch("http://localhost:3000/api/threads")
          .then((res) => res.json())
          .then((data) => setThreads(data));
      }, []);

    return (

        <Mainlayout>
   <div className="p-4 max-w-x1 mx-auto">
    <h1 className="text-x1 mb-4">home</h1>
    <CreateThread/>
    
            <ThreadList threads={threads} />
           

   </div>


 </Mainlayout>
        
        
    );

   
}
