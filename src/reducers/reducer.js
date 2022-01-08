import react from 'react';
var initState = {
    employees:[]
}

export default function reducer( state = initState, action) {
console.log("Before State", state, "Action",action);
 switch(action.type){
     case 'EMPLOYEE_LIST':
         return {
             ...state,
             employees: action.data
         }
     case 'EMPLOYEE_ADD':
         return {
             ...state, employees: [...state.employees, action.data]
         }
     case 'EDIT_EMPLOYEE':
         return {
             ...state, edit: true, formValue: action.data
         }
     case 'DELETE_EMPLOYEE':
         return {
             ...state, employees: action.data
         }
     case 'UPDATE_EMPLOYEE':
         return {
             ...state, employees: [ action.data]
         }

 }
 console.log("After State", state, "Action",action);
 return state;
}