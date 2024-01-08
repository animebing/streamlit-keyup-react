import {
  Streamlit,
  withStreamlitConnection,
} from 'streamlit-component-lib'
import React, { useEffect, useState } from 'react'
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
  const debounce = (callback, wait) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  };

  const {
    label,
    debounce: debounce_time,
    max_chars,
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

  const usedOnKeyUp = debounce_time > 0 ? debounce(keyUpHandler, debounce_time) : keyUpHandler
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
          // onKeyUp={usedOnKeyUp}
        />
      </div>
    </div>
  )
}

export default withStreamlitConnection(KeyUpComponent)
