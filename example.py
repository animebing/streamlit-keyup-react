import streamlit as st
from st_keyup_react import st_keyup_react
# from st_keyup import st_keyup

value = st_keyup_react('input', debounce=1000)
st.write(f'value: {value}')