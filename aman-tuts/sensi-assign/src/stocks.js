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


class Stocks extends Component {
    constructor(props){
        super(props);
        this.state={
          data:[],
          filterData:[]
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
            data:result,
            filterData:result
        })
    }

    componentDidMount(){
     const api=fetch("https://prototype.sbulltech.com/api/v2/instruments")
     api.then((res=>res.text())).then((data)=>
     this.csvJSON(data)
     )
    }

    checkValue(value){
      if(value.length===0){
        this.setState({
          data:this.state.filterData
        })
      }
      else{
        let filter=this.state.data
    
      let toBeSearchData=[...filter]
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
      }
    
    
    }

      
    
    



    render() {
    

    let data=this.state.data
        return (
      <div>
        <TextField  style={{display:"flex",justifyContent:"center",textAlign:"center",width:"50%",margin:"30px 20px 30px 450px" }}  id="outlined-basic" margin="dense" label="enter value" variant="outlined"  onChange={(e)=>this.checkValue(e.target.value)}/>

<TableContainer style={{display:"flex",justifyContent:"center" }} component={Paper}>
      <Table  size={"small"} style={{ width: 990}} aria-label="simple table">
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



export default Stocks;