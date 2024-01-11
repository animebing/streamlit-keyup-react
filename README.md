# streamlit-keyup-react

[![PyPI version](https://img.shields.io/pypi/v/streamlit-keyup-react.svg?logo=pypi&logoColor=FFE873)](https://pypi.org/project/streamlit-keyup-react/)
[![PyPI downloads](https://img.shields.io/pypi/dm/streamlit-keyup-react.svg)](https://pypistats.org/packages/streamlit-keyup-react)
[![GitHub](https://img.shields.io/github/license/animebing/streamlit-keyup-react.svg)](LICENSE)

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