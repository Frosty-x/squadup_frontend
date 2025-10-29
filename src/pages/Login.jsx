import React from 'react'
import Leftside from './leftside';
import Rightside from './Rightside';
const Login = () => {
  return (
       <div className="h-screen w-screen flex overflow-hidden mainscreen">
      <Leftside/>
      <Rightside/>
    </div>
   
  )
}

export default Login
