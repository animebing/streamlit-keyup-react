import os
from typing import Any, Callable, Dict, Optional, Tuple

import streamlit as st
import streamlit.components.v1 as components


_RELEASE = True
if not _RELEASE:
    _component_func = components.declare_component(
        "st_keyup_react",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("st_keyup_react", path=build_dir)


def st_keyup_react(
    label: str,
    value: str = "",
    max_chars: Optional[int] = None,
    key: Optional[str] = None,
    type: str = "default",
    debounce: Optional[int] = None,
    on_change: Optional[Callable] = None,
    args: Optional[Tuple[Any, ...]] = None,
    kwargs: Optional[Dict[str, Any]] = None,
    *,
    placeholder: str = "",
    disabled: bool = False,
    label_visibility: str = "visible",
):
    if key is None:
        key = "st_keyup_react_" + label

    component_value = _component_func(
        label=label,
        value=value,
        debounce=debounce,
        max_chars=max_chars,
        type=type,
        placeholder=placeholder,
        disabled=disabled,
        label_visibility=label_visibility,
        key=key,
        default=value,
    )

    if on_change is not None:
        if "__previous_values__" not in st.session_state:
            st.session_state["__previous_values__"] = {}

        if component_value != st.session_state["__previous_values__"].get(key, value):
            st.session_state["__previous_values__"][key] = component_value

            if args is None:
                args = ()
            if kwargs is None:
                kwargs = {}
            on_change(*args, **kwargs)
            
    return component_value
