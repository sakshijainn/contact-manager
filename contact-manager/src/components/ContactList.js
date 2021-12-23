import React from "react";
import ContactCard from "./ContactCard";
import {Link} from "react-router-dom"
const ContactList = (props) => {
  console.log(props);

  const deleteContactHandler =  (id)=>{
    props.getContactId(id)
  }


  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        key={contact.id}
        clickHander = {deleteContactHandler}
      />
    );
  });
  return(
    <div style={{marginTop :"4rem"}} className ="main">
      <h2>Contact List 
      <Link to ="/add">
      <button style={{marginLeft:"2rem"}} className ="ui blue button right">Add contact</button>
      </Link>  
      </h2>
    <div style={{margin:"2rem"}} className="ui celled list">{renderContactList}</div>
    </div>
  ) 
};

export default ContactList;