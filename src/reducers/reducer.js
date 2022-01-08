import react from 'react';
var initState = {
    Contacts:[]
}

export default function reducer( state = initState, action) {
console.log("Before State", state, "Action",action);
 switch(action.type){
     case 'Contact_LIST':
         return {
             ...state,
             Contacts: action.data
         }
     case 'Contact_ADD':
         return {
             ...state, Contacts: [...state.Contacts, action.data]
         }
     case 'EDIT_Contact':
         return {
             ...state, edit: true, formValue: action.data
         }
     case 'DELETE_Contact':
         return {
             ...state, Contacts: action.data
         }
     case 'UPDATE_Contact':
         return {
             ...state, Contacts: [ action.data]
         }

 }
 console.log("After State", state, "Action",action);
 return state;
}