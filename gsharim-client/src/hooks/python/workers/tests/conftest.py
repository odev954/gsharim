import pytest
import os 
import sys 

@pytest.fixture(scope="module", autouse=True)
def set_test_path():
    os.chdir(os.path.dirname(__file__))
