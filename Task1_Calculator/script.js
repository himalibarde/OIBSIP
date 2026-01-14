const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let lastAnswer = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        if (value === "clear") {
            currentInput = "";
            display.value = "";
        }

        else if (value === "del") {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        }

        else if (value === "ans") {
            currentInput += lastAnswer;
            display.value = currentInput;
        }

        else if (value === "√") {
            currentInput = `Math.sqrt(${currentInput})`;
            display.value = "√(" + display.value + ")";
        }

        else if (value === "±") {
            if (currentInput) {
                currentInput = currentInput.startsWith("-")
                    ? currentInput.slice(1)
                    : "-" + currentInput;
                display.value = currentInput;
            }
        }

        else if (value === "ENTER") {
            try {
                let result = eval(currentInput);
                display.value = result;
                lastAnswer = result;
                currentInput = result.toString();
            } catch {
                display.value = "Error";
                currentInput = "";
            }
        }

        else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});
