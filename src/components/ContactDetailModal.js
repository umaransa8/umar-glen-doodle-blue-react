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

export default function ContactDetailModal(props) {
  var [formValue, setFormValue] = React.useState({id:"",contactName:"", gender:"male", role:1});
 
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
          <h3 style={{textAlign:"center"}}>Contact DETAILS FOR  {formValue.id} - { formValue.contactName}</h3>
         
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>Contact Details For {formValue.contactName}</caption>
       
        <TableBody>
        <TableRow key={formValue.name}>
        <TableCell component="th" scope="column">
               Id
              </TableCell>
              <TableCell component="th" scope="column">
                {formValue.id}
              </TableCell>

             <TableCell component="th" scope="column">
               Name
              </TableCell>
              <TableCell component="th" scope="column">
                {formValue.contactName}
              </TableCell>

              
              
        </TableRow>

        <TableRow key={formValue.name}>
        <TableCell component="th" scope="column">
               Company Name
              </TableCell>
              <TableCell component="th" scope="column">
                {formValue.company}
              </TableCell>

             <TableCell component="th" scope="column">
               Gender
              </TableCell>
              <TableCell component="th" scope="column">
                {formValue.gender}
              </TableCell>

              
              
        </TableRow>
        <TableRow key={formValue.gender}>
              <TableCell component="th" scope="row">
               Company
              </TableCell>
              <TableCell component="th" scope="row">
                {formValue.company}
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