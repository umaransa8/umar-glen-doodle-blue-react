import react, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import ContactFormModal from './ContactFormModal';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { ConfirmProvider, useConfirm } from 'material-ui-confirm';
import { AccountCircle, Delete, Pinch } from '@mui/icons-material';
import '../modalStyle.css'
import ContactDetailModal from './ContactDetailModal';
const deleteStyle = {
  backgroundColor: 'Tomato'
}
const viewStyle = {
  backgroundColor: 'SlateBlue'
}
export default function ContactList() {

  const stateValue = useSelector((state) => state);
  const confirm = useConfirm();
  const Contacts = stateValue.Contacts;


  const dispatch = useDispatch();

  const [popOpen, setPopOpen] = useState(false);
  const [popDetailOpen, setDetailPopOpen] = useState(false);
  
  const [formValues, setFormValues] = useState({});
  const [edit, setEdit] = useState(false);
  const [detail, setDetail] = useState(false);

  const columns = [
    {
      label: "Contact Id",
      name: "id",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "contactName",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "company",
      label: "Company",
      options: {
        filter: true,
        sort: true,
      }
    },

    {
      name: "id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: value => {
          const userid = Contacts.find(Contact => Contact.id === value);
          return (
            <Button variant="contained" onClick={() => editPopUp(userid)} endIcon={<Pinch />}>Edit</Button>
          );
        }
      }
    },

    {
      name: "id",
      label: "Remove",
      options: {
        filter: false,
        sort: false,
        customBodyRender: value => {

          const userid = Contacts.filter(Contact => Contact.id !== value);
          console.log(userid);
          const handleDelete = value => {
            confirm({ description: `This will permanently delete..Are you sure ?.` })
              .then(() => dispatch({
                type: 'DELETE_Contact',
                data: userid
              }))
              .catch(() => console.log("Deletion cancelled."));
          };
          return (

            <Button style={deleteStyle} variant="contained" onClick={() => handleDelete()} endIcon={<Delete />}>Remove</Button>


          );


        }
      }
    },

    {
      name: "id",
      label: "Details",
      options: {
        filter: false,
        sort: false,
        customBodyRender: value => {

          const userid = Contacts.filter(Contact => Contact.id === value);
           return (
            <Button style={viewStyle} variant="contained" onClick= {()=>popDetailupOpen(userid)} endIcon={<AccountCircle />}>View</Button>
           );


        }
      }
    },


  ];



  const options = {
    filterType: 'checkbox',
    searchOpen: false,
    search: true,
    searchClose: true,
    filter: true,
    confirmFilters: true,

  };

  const editPopUp = (id) => {
    setEdit(true);
    dispatch({
      type: 'EDIT_Contact',
      data: id
    })
    setFormValues(id);
    console.log("FormValues", formValues);
    setPopOpen(popOpen => !popOpen);

  }



  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    console.log("result", result);
    return result;
  }

  const popupOpen = () => {
    setPopOpen(popOpen => !popOpen);

  }
  const popupClose = () => {
    setEdit(false);
    setPopOpen(popOpen => !popOpen);
  }

  const popDetailupOpen = (userid) => {
    setDetailPopOpen(popDetailOpen => !popDetailOpen);
    dispatch({
      type: 'EDIT_Contact',
      data: userid
    })
    setFormValues(userid);
    setDetail(true);
  }
   const popDetailupClose = () => {
    setDetailPopOpen(popDetailOpen => !popDetailOpen);
     setDetail(false);
  }
  return (
    <div>
      <ContactFormModal formValues={formValues} edit={edit} ContactId={makeid(9)} popupClose={popupClose} open={popOpen} />
     <ContactDetailModal popDetailupClose={popDetailupClose} formValues={formValues} open = {popDetailOpen} detail={detail} detailPopupOpen= {popDetailupOpen} />
      <MUIDataTable
        title={<div><h3 >Contact List<Button style={{ marginLeft: '2%' }} onClick={popupOpen} color="primary" variant="contained" size="small">  Add Contact </Button></h3></div>}
        data={Contacts}
        columns={columns}
        options={options}

      />



    </div>
  )
}