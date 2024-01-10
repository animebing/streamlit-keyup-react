import streamlit as st
from st_keyup_react import st_keyup_react

value = st_keyup_react('input', debounce=300)
st.write(value)
