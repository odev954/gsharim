import pytest
from utils import use_run_user_code

CODE_1 = """
x = 2
y = 3
l = [1,2,3]
tmp = l[x] + y
"""

CODE_2 = """
def some_funci_func():
    a = 1
    b = 2
    return a + b

value = 0
for i in range(10):
    value += some_funci_func()
"""

CODE_3 = """
a = 2
b = [i for i in range(10)]
c = [i for i in range(10)]
t = c if a == 2 else b
"""

CODE_4 = """
a = 2
b = [i for i in range(10)]
c = [i for i in range(10)]
t = c if a == 2 else b
a = 2
a = 2
a = 2
a = 2
a = 2
a = 2
a = 2
"""

@pytest.mark.parametrize("user_code, expected_call_count, expected_end_lineno", [(CODE_1, 4, 5), (CODE_2, 51, 5)])
def test_number_of_calls(user_code, expected_call_count, expected_end_lineno):
    """
    this test makes sure that the nuimber of calls to wait_delay_function is equal to the nunber of lines
    and that the lineno of in the end is correct.
    """
    state = {"call_counts": 0}
    def inc_count(_):
        state["call_counts"] += 1
    run_code, state_dict = use_run_user_code(user_code, verbose_delay=0,wait_delay_function=inc_count)
    run_code()
    assert state["call_counts"] == expected_call_count
    assert state_dict["current_line"] == expected_end_lineno

@pytest.mark.parametrize("user_code", [CODE_3, CODE_4])
def test_call_every_line(user_code):
    """
    This test uses linear code - no functions and no loops, and makes sure that every time that wait_delay_function is called, the current line-number is correct
    """
    state = {"call_counts": 0}
    def inc_count(_):
        state["call_counts"] += 1
        assert state_dict["current_line"] == state["call_counts"] + 1
    run_code, state_dict = use_run_user_code(user_code, verbose_delay=0,wait_delay_function=inc_count)
    run_code()
