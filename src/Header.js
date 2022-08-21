import React, {useContext} from 'react'
import { UserContext } from './UserContext'

const Header = () => {
    const {user} = useContext(UserContext)
  return (
    <div>
         <p>{user.username}</p>
    </div>
  )
}

export default Header