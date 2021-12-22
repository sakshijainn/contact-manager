import React,{useState} from 'react'

function AddContact(props) {
    const[name ,setName] = useState("")
    const [email,setEmail] = useState("");
    const submitHandler =(e)=>{
            e.preventDefault();
            console.log('clicked submit')
            if(!name || !email) { alert("Please fill....")}
            else if( name && email)
            {
                const allInput  ={ name :name , email :email}
                console.log(allInput)
                props.addContactHandler(allInput)
                setName("");
                setEmail("");
                //go back to contact list page
                //programmatic navigation with history 
                props.history.push("/")

            }

    }

    
    return (
        <div className ="ui main">
            <h2>Add contact</h2>
            <form className ="ui form">
                <div className ="field">
                    <label>Name</label>
                    <input  value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" placeholder="Name"/>

                </div>

                <div className ="field">
                    <label>Email</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" name="email" placeholder="Email"/>
                    
                </div>
                <button onClick ={submitHandler} className ="ui button blue">Add</button>
            </form>
            
        </div>
    )
}

export default AddContact
