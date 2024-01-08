import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"

import "./KeyUpComponent.css"

function onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
  Streamlit.setComponentValue((event.currentTarget as HTMLInputElement).value);
}

const debounce = (callback: Function, wait: number) => {
  let timeoutId: number | undefined = undefined;
  return (...args: any) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class KeyUpComponent extends StreamlitComponentBase {
  componentDidMount() {
    Streamlit.setFrameHeight(73);
  }

  render = (): ReactNode => {
    // Arguments that are passed to the plugin in Python are accessible
    // via `this.props.args`. Here, we access the "name" arg.
    const {
      label,
      value,
      debounce: debounce_time,
      max_chars,
      type,
      placeholder,
      disabled,
      label_visibility
    } = this.props.args;

    let inputType = "text";
    if (type == "password") {
      inputType = "password";
    }

    // Show a button and some text.
    // When the button is clicked, we'll increment our "numClicks" state
    // variable, and send its new value back to Streamlit, where it'll
    // be available to the Python program.
    // return (
    //   <div>
    //     <label htmlFor="input_box">{label}</label>
    //     <div className="input">
    //       <input 
    //         value={value}
    //         type={inputType}
    //         placeholder={placeholder}
    //         onKeyUp={debounce(onKeyUp, debounce_time)}
    //       />
    //     </div>
    //   </div>
    // )
    return (
      <div>
        <label htmlFor="input_box">{label}</label>
        <div className="input">
          <input 
            value={value}
            type={inputType}
          />
        </div>
      </div>
    )
  }
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(KeyUpComponent)
