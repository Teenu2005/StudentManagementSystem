import React from 'react'
import navItem from '../AdminNavItem'
import NavBar from '../../../components/NavBar'
import MessageSender from '../../../components/Mail'
function MailShow() {
  return (
    <>
    <NavBar nav={navItem} />
    <MessageSender />
    </>
  )
}

export default MailShow