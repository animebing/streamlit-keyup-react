# streamlit-keyup-react

React reimplementation of [st_keyup](https://github.com/blackary/streamlit-keyup), the code is modified from [component-template](https://github.com/streamlit/component-template/tree/master/template)


## Installation

`pip install streamlit-keyup-react`

## Usage

```python
import streamlit as st
from st_keyup_react import st_keyup_react

value = st_keyup_react('input', debounce=300)
st.write(value)
```