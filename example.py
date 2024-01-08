import streamlit as st
from st_keyup_react import st_keyup_react

value = st_keyup_react('input', debounce=200)
st.write(f'value: {value}')