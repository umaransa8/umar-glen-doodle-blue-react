import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Autocomplete, TextareaAutosize, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import onlyNumberKey, { makeid } from '../functionsfile'

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

export default function EmployeeFormModal(props) {
  var [formValue, setFormValue] = React.useState({id:"",empName:"", gender:"male", role:1});
  var [formValid, setFormValid] = React.useState(false);
  const stateValue =  useSelector((state)=>state);
  const employees = stateValue.employees;
  const dispatch = useDispatch();
  React.useEffect(()=>{
   // alert(props.edit);
    if(props.edit) {
      console.log("inid");
       setFormValue(props.formValues); 
    }
    else {   
      setFormValue({id:props.employeeId});  
      console.log("add");
    }
 },[props.edit,props.edit]);




     // setFormValue(employeeEdit.formValue)
    
     

  function randomNumber(min, max) {
    var output = Math.abs(Math.random() * (max - min) + min);
    console.log("output",output);
    return output.toString();
  }
  
  function handleChange (event)  {
   
    const name = event.target.name;
    const value = event.target.value;
    if(value.length == "0" || value == "" || typeof value  == "undefined") {
      setFormValid(false);
    }
    else {
      if(formValue.id && formValue.empName && formValue.salary && formValue.address && formValue.role)
       setFormValid(true);
    }
   
    setFormValue((prev)=>({
      ...prev,[name]:value
    })
    )
    
    console.log(formValue);
}

  
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
 }
 console.log("result",result);
 return result;
}

function handleSubmit() {
 // alert("His");
  dispatch({
    type : "EMPLOYEE_ADD",
    data:formValue
  });
  setFormValue({id:makeid(9)})
  props.popupClose();
  setFormValid(false);
}


function updateData() {
  const filteredEmployess = employees.filter(x=>x.id === formValue.id);
  console.log("filteredEmployess",filteredEmployess);
  var newData = employees.map(el => {
    if(el.id == formValue.id)  {
      return Object.assign({}, el, {empName:formValue.empName, role:formValue.role, age:formValue.age, email:formValue.email, salary:formValue.salary, gender:formValue.gender})
    }
    return el
});
console.log(newData);
dispatch({
  type : "UPDATE_EMPLOYEE",
  data:formValue
});
dispatch({
  type : "EMPLOYEE_LIST",
  data:newData
});
props.popupClose();
 }

 const roles = [
    {id:1, label:"Software Developer"},
    {id:2, label:"Tester"},
    {id:3, label:"Manual Tester"},
    {id:4, label:"Automated Tester"},
    {id:5, label:"React js Developer"},
 ]



 
  return (
    <div>

      <Modal 
        open={props.open}       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3 style={{textAlign:"center"}}>{!props.edit ? `ADD EMPLOYEE  ${props.employeeId}` :`UPDATE EMPLOYEE ${props.formValues.id}` }</h3>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm ={12}>
              <TextField    inputProps={{ disabled: true }} id="standard-error-helper-text" name='id'  error={formValue.hasOwnProperty("id") && formValue.id === ""} helperText={formValue.id === "" ? 'Employee Id is Required' : ' '} value={formValue.id} onChange = {handleChange} label="Employeer Id * "  variant="standard" />
          </Grid>
          <Grid item lg={6} md={6} sm ={12}>
               <TextField  id="standard-error-helper-text" name='empName'  error={formValue.hasOwnProperty("empName") && formValue.empName === ""} helperText={formValue.empName === "" ? 'Employee Name is Required' : ' '} value={formValue.empName} onChange = {handleChange} label="Employees's Name * "  variant="standard" />
          </Grid>

          <Grid item lg={6} md={6} sm ={12}>
            <TextField  id="standard-error-helper-text" name='email'  error={formValue.hasOwnProperty("email") &&((formValue.email === "") ||  (!formValue.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")))} helperText={(formValue.email === "") || (formValue.email && (!formValue.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"))) ? 'Please Enter Valid Email' : ' '} value={formValue.email}  onChange = {handleChange} label="Email * "    variant="standard" />
          </Grid>

          <Grid item lg={6} md={6} sm ={12}>
            <TextField  type="number" id="standard-error-helper-text" label="Age * "  name='age' value={formValue.age}  onChange = {handleChange}    variant="standard" />
          </Grid>

          <Grid item lg={6} md={6} sm ={12}>
          <TextField  id="standard-error-helper-text"  type="number"  label="Salary *"   name='salary' value={formValue.salary}  onChange = {handleChange}  variant="standard" />
          </Grid>

          <Grid item lg={6} md={6} sm ={12}>
         <Autocomplete
              id="Role"
              onChange={(event, value)=> {if(value.label != null) setFormValue(sta=>({  ...sta, role:value.label}))}} 
              options={roles}  
              value={formValue.role}
              name ="role"
              variant="standard" 
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField variant="standard"  {...params} label="Role" />}
            />

    </Grid>

    <Grid item lg={12} md={6} sm ={12}>
     <TextareaAutosize
         minRows={3}
         variant="standard" 
        placeholder="Enter the adddress"
        style={{ width: '100%' }}
        name = "address"
        value = {formValue.address}
        onChange = {handleChange}
      />
    </Grid>
    
           
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row aria-label="gender" value= {formValue.gender} name="gender">
                <FormControlLabel value="male"  control={<Radio />}   label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />            
                <FormControlLabel value="other" control={<Radio />} label="Other" />             
              </RadioGroup>
            
           

         
          <Grid item lg={6} md={6} sm ={12} style={{textAlign:'right'}}>
           {!props.edit ? <Button color="primary" disabled={!formValid} variant="contained" onClick = {handleSubmit}  >ADD EMPLOYEE</Button> :   <Button color="primary" disabled={!formValid} variant="contained"  onClick = {updateData} >UPDATE EMPLOYEE</Button>}  
           </Grid>
         
         <Grid item lg={6} md={6} sm ={12}>
             <Button  color="primary" variant="contained"   onClick = {props.popupClose} >Close</Button>    
         </Grid>
       
      </Grid>


        </Box>
      </Modal>
    </div>
  );
}