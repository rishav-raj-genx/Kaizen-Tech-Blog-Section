const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const codeBlock = button
            .closest(".code-block")
            .querySelector("pre code");

        const code = codeBlock.innerText;

        navigator.clipboard.writeText(code)
            .then(() => {

                button.textContent = "Copied!";

                setTimeout(() => {

                    button.textContent = "Copy";

                }, 2000);

            })
            .catch(() => {

                button.textContent = "Failed";

                setTimeout(() => {

                    button.textContent = "Copy";

                }, 2000);

            });

    });

});