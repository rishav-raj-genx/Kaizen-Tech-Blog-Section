document.addEventListener("DOMContentLoaded", () => {
    const tocToggle = document.getElementById("tocToggle") || document.querySelector(".toc-toggle");
    const tocSidebar = document.querySelector(".toc-sidebar");
    const tocClose = document.getElementById("tocClose") || document.querySelector(".toc-close");
    const tocOverlay = document.getElementById("tocOverlay") || document.querySelector(".toc-overlay");
    const tocLinks = document.querySelectorAll(".toc-links a");

    function openSidebar() {
        if (tocSidebar) tocSidebar.classList.add("active");
        if (tocOverlay) tocOverlay.classList.add("active");
        if (tocToggle) tocToggle.classList.add("hidden");
    }

    function closeSidebar() {
        if (tocSidebar) tocSidebar.classList.remove("active");
        if (tocOverlay) tocOverlay.classList.remove("active");
        if (tocToggle) tocToggle.classList.remove("hidden");
    }

    // Open sidebar
    if (tocToggle) {
        tocToggle.addEventListener("click", openSidebar);
    }

    // Close sidebar via close button
    if (tocClose) {
        tocClose.addEventListener("click", closeSidebar);
    }

    // Close sidebar via overlay
    if (tocOverlay) {
        tocOverlay.addEventListener("click", closeSidebar);
    }

    // Close sidebar automatically after clicking any TOC link
    tocLinks.forEach(link => {
        link.addEventListener("click", closeSidebar);
    });

    // =====================================
    // COPY CODE BUTTON HANDLER
    // =====================================
    document.addEventListener("click", async (e) => {
        const copyBtn = e.target.closest(".copy-btn");
        if (!copyBtn) return;

        const codeContainer = copyBtn.closest(".code-block");
        if (!codeContainer) return;

        const codeElement = codeContainer.querySelector("pre code") || codeContainer.querySelector("code") || codeContainer.querySelector("pre");
        if (!codeElement) return;

        const codeToCopy = codeElement.innerText || codeElement.textContent;

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(codeToCopy);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = codeToCopy;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
            }

            const originalText = copyBtn.textContent;
            copyBtn.textContent = "Copied! ✓";
            copyBtn.classList.add("copied");

            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.classList.remove("copied");
            }, 2000);
        } catch (err) {
            console.error("Failed to copy code:", err);
            copyBtn.textContent = "Failed ✕";
            setTimeout(() => {
                copyBtn.textContent = "Copy";
            }, 2000);
        }
    });
});