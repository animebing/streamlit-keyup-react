import {
  Streamlit,
  withStreamlitConnection,
} from 'streamlit-component-lib'
import React, { useCallback, useEffect, useState } from 'react'
import './KeyUpComponent.css'


const debounce = (callback, wait) => {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}


const KeyUpComponent = (props) => {
  const [text, setText] = useState(props.args.value);
  useEffect(() => Streamlit.setFrameHeight(73), [])
  
  const changeHandler = (event) => {
    setText(event.target.value)
  };

  const keyUpHandler = (event) => {
    Streamlit.setComponentValue(event.target.value);
  }

  const debounce_time = props.args.debounce
  // if i do not use useCallback here, the debounce will not work, i do not know the reason now
  // eslint-disable-next-line
  const debouncedKeyUpHandler = useCallback(
    debounce(keyUpHandler, debounce_time),
    [debounce_time],
  );

  const {
    label,
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
          onKeyUp={debounce_time > 0 ? debouncedKeyUpHandler : keyUpHandler}
        />
      </div>
    </div>
  )
}

export default withStreamlitConnection(KeyUpComponent)
