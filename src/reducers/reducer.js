import react from 'react';
var initState = {
    Contacts:[]
}

export default function reducer( state = initState, action) {
console.log("Before State", state, "Action",action);
 switch(action.type){
     case 'CONTACT_LIST':
         return {
             ...state,
             Contacts: action.data
         }
     case 'CONTACT_ADD':
         return {
             ...state, Contacts: [...state.Contacts, action.data]
         }
     case 'EDIT_CONTACT':
         return {
             ...state, edit: true, formValue: action.data
         }
     case 'DELETE_CONTACT':
         return {
             ...state, Contacts: action.data
         }
     case 'UPDATE_CONTACT':
         return {
             ...state, Contacts: [ action.data]
         }

 }
 console.log("After State", state, "Action",action);
 return state;
}