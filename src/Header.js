import React, {useContext} from 'react'
import { UserContext } from './UserContext'

const Header = () => {
    const {user} = useContext(UserContext)
  return (
    <div>
         <div>{user.username}</div>
    </div>
  )
}

export default Header