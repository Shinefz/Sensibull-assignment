import React, { Component } from 'react';
import Fuse from 'fuse.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';


class Sensi extends Component {
    constructor(props){
        super(props);
        this.state={
          data:[]
        }
    }

    
  
     redirectUrl = (value) => {
      window.location.replace(`/Quotes?&symbol=${value}`)
    }

     csvJSON(csv) {
        const lines = csv.split('\n')
        const result = []
        const headers = lines[0].split(',')
    
        for (let i = 1; i < lines.length; i++) {        
            if (!lines[i])
                continue
            const obj = {}
            const currentline = lines[i].split(',')
    
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j]
            }
            result.push(obj)
        }
        
        this.setState({
            data:result
        })
    }

    componentDidMount(){
     const api=fetch("https://prototype.sbulltech.com/api/v2/instruments")
     api.then((res=>res.text())).then((data)=>
     this.csvJSON(data)
     )
    }

    checkValue(value){
    let toBeSearchData=this.state.data
    const fuse = new Fuse(toBeSearchData, {
        shouldSort:true,
        keys: ['Symbol', 'name']
    })
     
    // Search
    const result = fuse.search(value)
    let finalMap=[]
     let finalData=result && result.map((value,key)=>{
      return finalMap.push(value.item)
     })
     this.setState({data:finalMap})
    console.log(finalMap)
    
    }

      
    
    



    render() {
    

    let data=this.state.data
        return (
      //       <div>
      // <input onChange={(e)=>this.checkValue(e.target.value)} type="text"></input>
      //          

      //           <table>
      //   <thead>
      //     <tr>
      //       <th>Symbol</th>
      //       <th>name</th>
      //       <th>category</th>
      //       <th>ValidTill</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {data && data.map((value, key) => {
      //       return (
      //         <tr key={key}>
      //           <td onClick={(e)=>this.redirectUrl(value.Symbol)}>{value.Symbol}</td>
      //           <td>{value.Name}</td>
      //           <td>{value.Sector}</td>
      //           <td>{value.Validtill}</td>
      //         </tr>
      //       );
      //     })}
      //   </tbody>
      // </table>
      //       </div>


      <div>
        <TextField  className='textCha' id="outlined-basic" margin="dense" label="enter value" variant="outlined"  onChange={(e)=>this.checkValue(e.target.value)}/>

<TableContainer component={Paper}>
      <Table  size={"small"} sx={{ minWidth: 10 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell align="center">Symbol</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">ValidTill</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow
              key={row.name}
            
            >
              <TableCell  onClick={(e)=>this.redirectUrl(row.Symbol)} component="th" scope="row">
                {row.Symbol}
              </TableCell>
              <TableCell  align="center">{row.Name}</TableCell>
              <TableCell align="center">{row.Sector}</TableCell>
              <TableCell align="center">{row.Validtill}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>

      
        );
    }
}



export default Sensi;