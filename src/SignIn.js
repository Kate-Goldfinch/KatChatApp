import React, {useState, useContext} from 'react'
import { UserContext } from './UserContext'
import apiService from './api/services'





const SignIn = () => {
    const [newUserName, setNewUserName] = useState('')
    const {setUser} = useContext(UserContext)
    const handleUserNameChange = (e)=> setNewUserName(e.target.value)

    const handleSignIn = (e)=>{
        e.preventDefault()

        let tempNewUser = {
            username: 'kate1234',
            token: '62f7740c6c017917269ca417'
        }

        // apiService
        //   .signIn({
      //   username: newUserName
      // })
        //   .then(response =>{
        //     console.log(response)
        //     if(response.status !== "username taken"){
              // apiService.getUser(response.token)
              // setUser(response)
              apiService.getUser(tempNewUser.token)
              setUser(tempNewUser)
            // }
            // })
      }  

  return (
    <div>
        <form onSubmit={handleSignIn}>
            <input 
            value={newUserName}
            onChange={handleUserNameChange}
            placeholder='Username'/>
            <button type="submit">Sign In</button>
        </form>
    </div>
  )
}

export default SignIn