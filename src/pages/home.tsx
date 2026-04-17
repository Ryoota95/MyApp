import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import ThreadList from "../component/threadlist";

import CreateThread from "../component/createthread";



type Thread = {
  id: string;
  content: string;
  image?: string | null;
  user?: any;
  likes?: any[];
  }

export default function Dashboard() {
 
  
  const [threads, setThreads] = useState<Thread[]>([]);
  

   console.log(threads);
    

    useEffect(() => {
   const token = sessionStorage.getItem("token")
   
   console.log("token di home", token);
   

        fetch("http://localhost:3000/api/threads", {
          headers : {
            Authorization:  `Bearer ${token}`
          }
        })
          .then((res) => res.json())
          .then((data) => setThreads(data));
      }, []);

     useEffect(() => {
  const handleNewThread = (newThread: any) => {
    console.log("NEW THREAD:", newThread);
    setThreads((prev: any) => [newThread, ...prev]);
  };

  socket.on("thread:new", handleNewThread); 

  return () => {
    socket.off("thread:new", handleNewThread); 
  };
}, []);

    return (

        
   
  <div>
     <CreateThread setThreads={setThreads}/>
        <ThreadList threads={threads}/>  
   </div>


        
        
    );

   
}
