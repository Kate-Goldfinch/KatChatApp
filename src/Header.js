import React from 'react'

const Header = ({user}) => {

  return (
    <div>
         {user && <p>{user.username}</p>}
    </div>
  )
}

export default Header