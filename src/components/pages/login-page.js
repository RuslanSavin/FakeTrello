import React, { useRef } from "react";
import InputWithLabel from "../input-with-label/input-with-label";
import {Link} from "react-router-dom";
import collectFormData from "../../utils/collectFormData";
import {useTrelloService} from "../hooks";

const LoginPage = ({setAuth}) => {

  const {postLogin} = useTrelloService();
  const errorRef = useRef();

  return (
    <>
      <h2 ref={errorRef}></h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        postLogin(collectFormData(e))
          .then(() => {setAuth(true)})
          .catch((e) => {
            errorRef.current.textContent = e.message;
            throw new Error(e)
          });
      }}>
        <InputWithLabel inputName='identifier' label='Login'/>
        <InputWithLabel inputName='password' label='Password' type="password"/>
        <button>Submit</button>
      </form>
      <Link to="/register">To Register Page</Link>
    </>
  )
}


export default LoginPage;