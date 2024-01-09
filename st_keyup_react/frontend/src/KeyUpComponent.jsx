import {
  Streamlit,
  withStreamlitConnection,
} from 'streamlit-component-lib'
import React, { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce';
import './KeyUpComponent.css'

const KeyUpComponent = (props) => {
  const [text, setText] = useState(props.args.value);
  useEffect(() => Streamlit.setFrameHeight(73), [])
  
  const changeHandler = (event) => {
    setText(event.target.value)
  };

  const keyUpHandler = (event) => {
    Streamlit.setComponentValue(event.target.value);
  }
  const debounced = useDebouncedCallback(
    (event) => {
      Streamlit.setComponentValue(event.target.value);
    },
    props.args.debounce,
  );

  const {
    label,
    max_chars,
    debounce,
    type,
    placeholder,
    disabled,
    label_visibility
  } = props.args;

  const maxLength = max_chars !== 0 ? max_chars : undefined;
  let inputType = 'text';
  if (type === 'password') {
    inputType = 'password';
  }

  let outerClassName = ''
  if (disabled) {
    outerClassName += 'disabled';
  }
  if (label_visibility === "hidden") {
    outerClassName += ' label-hidden';
  }
  else if (label_visibility === "collapsed") {
    outerClassName += ' label-collapsed';
    Streamlit.setFrameHeight(45);
  }
  outerClassName = outerClassName.trim();
  return (
    <div className={outerClassName}>
      <label>{label}</label>
      <div className="input">
        <input
          disabled={disabled}
          maxLength={maxLength}
          type={inputType}
          placeholder={placeholder}
          value={text}
          onChange={changeHandler}
          onKeyUp={debounce > 0 ? (event) => debounced(event) : keyUpHandler}
        />
      </div>
    </div>
  )
}

export default withStreamlitConnection(KeyUpComponent)
