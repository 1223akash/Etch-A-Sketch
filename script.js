let box;
const container = document.querySelector(".grids");

// function create the grid giving grid size as argument
function createBoxes(size) {
    container.innerHTML = "";
    const containerSize = 600;
    const gridSize = containerSize / size;
    const total = (size * size) + size;
    const mod = size + 1;

    for (let i = 1; i < total; i++) {
        box = document.createElement("div");
        box.classList.add("grid");

        if (i % mod === 0) {
            box.style.cssText = "border: 0; height: 0; width: 100%";
        } else {
            box.style.cssText = `border: 1px solid black; height: ${gridSize}px; width: ${gridSize}px;`;
        }
        container.appendChild(box);
    }

    let isNormal = false;
    let isRainbow = false;  // flag to store if rgb button is clicked or not
    let isDark = false;  // flag to store if dark button is clicked or not
    const boxes = document.querySelectorAll(".grid");
    const normalBtn = document.querySelector(".normal")
    const rgbBtn = document.querySelector(".rgb");
    const darkBtn = document.querySelector(".dark");
    const resetBtn = document.querySelector(".reset");

    function eventHandler(event) {
        if (isRainbow) {
            event.target.style.opacity = 1;
            event.target.style.backgroundColor = "#" + randomColor();
        } else if (isDark) {
            if (event.target.style.opacity === "1") {
                event.target.style.opacity = 0;
            }
            event.target.style.backgroundColor = "#000";
            if (event.target.style.opacity <= 0.9) {
                event.target.style.opacity = +event.target.style.opacity + 0.1; // +event.target.style.opacity to convert from string to number
            }
        } else {
            event.target.style.opacity = 1;
            event.target.style.backgroundColor = "#000"
        }
    }

    // Checking if rgb button is clicked or not and do certain operations according to the flag value
    normalBtn.addEventListener("click", () => {
        isNormal = true;
        isRainbow = false;
        isDark = false;
    })

    rgbBtn.addEventListener("click", () => {
        isNormal = false;
        isRainbow = true;
        isDark = false;
    })

    darkBtn.addEventListener("click", () => {
        isNormal = false;
        isRainbow = false;
        isDark = true;
    })

    const randomColor = () => {
        // the highest number that can be represented by a 24-bit binary number (which is used in RGB color values). In hexadecimal, 16777215 is represented as FFFFFF.
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return randomColor;
    }

    // handling mouseover event with the help of eventHandler function
    boxes.forEach((box) => {
        box.addEventListener("mouseover", eventHandler);
    });

    // Clear the squares
    resetBtn.addEventListener("click", () => {
        boxes.forEach((box) => {
            box.style.backgroundColor = "white";
            box.style.opacity = 1;
        });
    });
}

// Grid Size Button
const gridSizeBtn = document.querySelector(".size");
gridSizeBtn.addEventListener("click", () => {
    while (true) {
        const input = +prompt("Enter grid size (1 to 100)");
        if (!input || input > 100 || input < 1) {
            alert("enter a valid value");
        }
        else {
            // while (container.firstChild) container.removeChild(container.firstChild);
            createBoxes(input);
            break;
        }
    }
})

createBoxes(16);