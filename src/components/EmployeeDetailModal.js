import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Grid, Modal } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const style2 = {
    borderRadius:'5%',
    width:'50% !important'
};

export default function EmployeeDetailModal(props) {
  var [formValue, setFormValue] = React.useState({id:"",empName:"", gender:"male", role:1});
 
  React.useEffect(()=>{
   console.log(props.formValues)
    if(props.detail) {
     
       setFormValue(props.formValues[0]); 
    }
 },[props.detail]);


 
  return (
    <div>

      <Modal
        open={props.open}       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3 style={{textAlign:"center"}}>EMPLOYEE DETAILS FOR  {formValue.id} - { formValue.empName}</h3>
         
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>Employee Details For {formValue.empName}</caption>
       
        <TableBody>
        <TableRow key={formValue.name}>
             <TableCell component="th" scope="column">
               Name
              </TableCell>
              <TableCell component="th" scope="column">
                {formValue.empName}
              </TableCell>

              
              <TableCell component="th" scope="row">
               Age
              </TableCell>
              <TableCell component="th" scope="row">
                {formValue.age}
              </TableCell>
        </TableRow>
        <TableRow key={formValue.gender}>
              <TableCell component="th" scope="row">
               Gender
              </TableCell>
              <TableCell component="th" scope="row">
                {formValue.gender}
              </TableCell>
              <TableCell component="th" scope="row">
               Role
              </TableCell>
              <TableCell component="th" scope="row">
                {formValue.role}
              </TableCell>
       </TableRow>
        
       <TableRow key={formValue.gender}>
       <TableCell component="th" scope="row">
               Salary
              </TableCell>
              <TableCell component="th" scope="row">
                {formValue.salary}
              </TableCell>
       
      
              <TableCell component="th" scope="row">
               Address
              </TableCell>
              <TableCell component="th" scope="row">
                {formValue.address}
              </TableCell>
       </TableRow>
       
        </TableBody>
      </Table>
    </TableContainer>
  
    <Grid item lg={12} style= {{textAlign:"center"}} md={6} sm ={12}>
             <Button  color="primary" variant="contained"   onClick = {props.popDetailupClose} >Close</Button>    
         </Grid>


        </Box>
      </Modal>
    </div>
  );
}