
import pytest
import sys
from utils import use_run_user_code

CODE_1 = """
def factorial(x):
    if x <= 1:
        return 1
    return x * factorial(x-1)

class Calculator:
    def __init__(self, order):
        self.order = order

    def calculate(self):
        return factorial(self.order)

    def __call__(self):
        return self.calculate()

c = Calculator(5)
# make sure that the type conversions work
print(c())
"""

CODE_2 = """
def create_values(amount):
    return list(range(amount))
values = create_values(10)
values = [value ** 2 for value in values]
max_value = max(values)
print(max_value)
"""

# this code will only print "123\n" to the screen if an "await" call will be added before print_to_screen()
TEST_AUTO_AWAIT = """
async def print_to_screen():
    print(123)
print_to_screen()
"""

CODE_WITH_ERROR = """
int("asasdasd") # this should fail and rais an error
"""

ERROR_EXPECTED_OUTPUT = """{"lineno": 2, "end_lineno": 2, "offset": 1, "end_offset": -1, "msg": "invalid literal for int() with base 10: \'asasdasd\'"}"""

class NewStdout:
    def __init__(self):
        self.text = []

    def write(self, text):
        self.text.append(text)

    def flush(self):
        """
        To approximate a stream, this function must have an implementation.
        Because it's a mock for testing, and not a real stream, we don't write the data to anywhere.
        """
        pass

class NewStdoutContextManager:
    def __init__(self):
        self.stdout = None
        self.new_stdout = NewStdout()

    def __enter__(self):
        self.stdout = sys.stdout
        sys.stdout = self.new_stdout

    def __exit__(self, type, value, traceback):
        sys.stdout = self.stdout

    def output(self):
        return "".join(self.new_stdout.text)


@pytest.mark.parametrize("user_code, expected_output, auto_await", [(CODE_1, "120\n", False), (CODE_2, "81\n", False), (CODE_2, "81\n", True), (TEST_AUTO_AWAIT, "123\n", True)])
def test_correct_code_running(user_code, expected_output, auto_await):
    """
    this test will run code python that will print a result of a computation, this test will make sure that the correct value is returend without any error being raised
    """
    run_code, _ = use_run_user_code(user_code, auto_await=auto_await)
    stdout_context_manager = NewStdoutContextManager()
    with stdout_context_manager:
        run_code()
    code_output = stdout_context_manager.output()
    assert code_output == expected_output

@pytest.mark.parametrize("code, expected_error", [(CODE_WITH_ERROR, ERROR_EXPECTED_OUTPUT)])
def test_check_errors(code, expected_error):
    run_code, _ = use_run_user_code(code, auto_await=False)
    exception = None
    try:
        run_code()
    except Exception as e:
        exception = e
    assert str(exception) == expected_error
