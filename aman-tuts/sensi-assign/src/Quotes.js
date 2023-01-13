import React, { useEffect, useState }  from 'react';
const Quotes=(props)=>{
const [quotes,setQoutes]=useState([]);


const windowUrl = window.location.search;
const qoutesValue=windowUrl.split("?&")[1].split("=")[1]

useEffect(() => {
    fetchData();
  },[]);


 const fetchData = async () => {
    let response = await (
      await fetch(`https://prototype.sbulltech.com/api/v2/quotes/${qoutesValue}`)
    ).json();
    let data=response.payload[qoutesValue]
    setQoutes(data);
  };


    return(
      <div>
      {quotes && quotes.map(function(d, idx){
         return (
          <ul >
            <li >{d.price}</li>
            <li >{d.time}</li>
            <li >{d.valid_till}</li>
          </ul>
         
        
         )
       })}
      </div>
    )
}


export default Quotes;