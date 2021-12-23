import React,{useState , useEffect} from "react"
import { BrowserRouter as Router , Switch,Route} from  "react-router-dom"
import {uuid} from 'uuidv4'
import './App.css';
import Header from "./Header"
import AddContact from "./AddContact"
import ContactList from "./ContactList"
import ContactDetail from "./ContactDetail.jsx"
import api from "../api/contacts"


function App() {
  const LOCAL_STORAGE_KEY = "contacts"
  // const getLocalItems  =()=>{
  //   let contactList = localStorage.getItem(LOCAL_STORAGE_KEY)
  //   if(contactList)
  //   {
  //     return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  //   }
  //   else 
  //   {
  //     return[];
  //   }

   //retrieve contacts 

   const retrieveContacts  =async()=>{
    const response  = await api.get("/contacts")
    return response.data;
  }

    const getAllContacts = async ()=>{
      const allContacts = await retrieveContacts()
      if(allContacts)
      {
        setContacts(allContacts)
      }
    }
    getAllContacts()
  

  // const LocalItems  = getLocalItems();

  const[contacts , setContacts] = useState([]);
  

 
  const addContactHandler =async(contact)=>{
    console.log(contact)
    const request ={
      id:uuid(),
      ...contact
    }

    //api call
    const response = await api.post("/contacts", request)
    // setContacts([...contacts , {id: uuid() ,...contact}])
    setContacts([...contacts,response.data])
  }


  const removeContactHandler  = async(id)=>{
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact)=>{return contact.id !== id})
    setContacts(newContactList)
  }



  useEffect(()=>{
      //localStorage.setItem(LOCAL_STORAGE_KEY , JSON.stringify(contacts))
  },[contacts])

  return (
    <div className="ui container">
         <Router>
         <Header/>
         <Switch>

         {/* when you want to pass props in route , this creates performance issue, instead we will use render method 
          <Route path ="/" exact component ={()=><ContactList contacts ={contacts} 
                     getContactId ={removeContactHandler}/>} />
         <Route path ="/add" component ={()=><AddContact addContactHandler ={addContactHandler}/>} /> */}

         <Route path ="/" exact render ={(props)=> 
         (<ContactList {...props}
         contacts ={contacts} 
         getContactId ={removeContactHandler}/>)}/>

         <Route path ="/add" exact render ={(props)=> 
          (<AddContact {...props}
            addContactHandler ={addContactHandler}/>)}/>
         
         
        

         <Route path ="/contact/:id" component  ={ContactDetail}/>
        
         
         </Switch>
         </Router>
         
         
    </div>
  );
}

export default App;
