import React, { useEffect, useState }  from 'react';
import TableSortLabel from '@mui/material/TableSortLabel';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const Quotes=(props)=>{
const [quotes,setQoutes]=useState([]);
const [rowData, setRowData] = useState(quotes);
const [orderDirection, setOrderDirection] = useState("asc");

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
    refreshFunction(data)
    console.log(data)
   
    
  };



const  refreshFunction=(value)=>{
  let finalDate=0;
  let refValue=[...value]
  let a=refValue.sort((a, b) =>
  a.valid_till > b.valid_till ? 1 : b.valid_till > a.valid_till ? -1 : 0
);
 const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
  const d = new Date();
  let x=a[0].valid_till
  let mainDate= `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  var date = new Date(mainDate); 
  var date1 = date.getTime();
  var date2ndDate=new Date(x)
  var date2=date2ndDate.getTime()

  if(date2>date1){
     finalDate=date2-date1
     const interval = setTimeout(() => {
       fetchData()
    },finalDate);
    
  }
  

}
 
  const sortArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.time > b.time ? 1 : b.time > a.time ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.time < b.time ? 1 : b.time < a.time ? -1 : 0
        );
    }
  };
   
  const handleSortRequest = () => {
    setRowData(sortArray(quotes, orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };


    return(
      <>
      <TableContainer component={Paper}>
      <Table  size={"small"} sx={{ minWidth: 10,padding:"20px" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell align="center">Price</TableCell>
            <TableCell onClick={handleSortRequest} align="center">
            <TableSortLabel active={true} direction={orderDirection}>
                time
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">valid_till</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quotes && quotes.map((row) => (
            <TableRow
              key={row.name}
            
            >
              <TableCell  onClick={(e)=>this.redirectUrl(row.Symbol)} component="th" scope="row">
                {row.price}
              </TableCell>
              <TableCell  align="center">{row.time}</TableCell>
              
              <TableCell align="center">{row.valid_till}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     </>
     
    )
}


export default Quotes;