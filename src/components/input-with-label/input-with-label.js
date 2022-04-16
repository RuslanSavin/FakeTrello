import React from "react";
import './input-with-label.scss'

const InputWithLabel = React.memo(({inputName, label, type = 'text'}) => {
  return (
    <>
      <label className="inputLabel" htmlFor={inputName}>{label}</label>
      <input className="input" name={inputName} type={type}/>
    </>

  )
})

export default InputWithLabel;