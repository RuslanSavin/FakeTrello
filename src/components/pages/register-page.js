import React, {useRef} from "react";
import InputWithLabel from "../input-with-label/input-with-label";
import {Link} from "react-router-dom";
import collectFormData from "../../utils/collectFormData";
import {useTrelloService} from "../hooks";

const RegisterPage = ({setAuth}) => {
  const { postRegister } = useTrelloService();
  const errorRef = useRef();
  return (
    <>
      <div ref={errorRef}></div>
      <form onSubmit={(e) => {
        e.preventDefault();
        postRegister(collectFormData(e))
          .then(() => {setAuth(true)})
          .catch((e) => {
            errorRef.current.textContent = e.message;
            throw new Error(e)
        });
      }}>
        <InputWithLabel inputName='username' label='Login'/>
        <InputWithLabel inputName='email' label='Email' type="email"/>
        <InputWithLabel inputName='password' label='Password' type="password"/>
        <button>Submit</button>
      </form>
      <Link to="/">To Login Page</Link>
    </>
  )
}

export default RegisterPage;