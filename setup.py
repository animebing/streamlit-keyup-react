from pathlib import Path

import setuptools

this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text()

setuptools.setup(
    name="streamlit-keyup-react",
    version="0.1.0",
    author="Yanbing Dong",
    author_email="yanbing_dong@hotmail.com",
    description="Text input that renders on keyup",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/animebing/streamlit-keyup-react",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.7",
    install_requires=["streamlit >= 1.2"],
)
