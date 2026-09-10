/* ==========================================================================
   Kaizen Tech Blog Section — Interactive Script
   Author: Shubham
   Features:
   - Sticky TOC active link tracking on scroll
   - Mobile responsive drawer toggle & overlay
   - Copy-to-clipboard for C++ code blocks with tooltip feedback
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // =====================================
    // 1. MOBILE TOC DRAWER CONTROLS
    // =====================================
    const tocToggle = document.getElementById("tocToggle") || document.querySelector(".toc-toggle");
    const tocSidebar = document.querySelector(".toc-sidebar");
    const tocClose = document.getElementById("tocClose") || document.querySelector(".toc-close");
    const tocOverlay = document.getElementById("tocOverlay") || document.querySelector(".toc-overlay");
    const tocLinks = document.querySelectorAll(".toc-links a");

    function openSidebar() {
        if (tocSidebar) tocSidebar.classList.add("active");
        if (tocOverlay) tocOverlay.classList.add("active");
        if (tocToggle) tocToggle.classList.add("hidden");
        document.body.style.overflow = window.innerWidth <= 1024 ? "hidden" : "";
    }

    function closeSidebar() {
        if (tocSidebar) tocSidebar.classList.remove("active");
        if (tocOverlay) tocOverlay.classList.remove("active");
        if (tocToggle) tocToggle.classList.remove("hidden");
        document.body.style.overflow = "";
    }

    if (tocToggle) tocToggle.addEventListener("click", openSidebar);
    if (tocClose) tocClose.addEventListener("click", closeSidebar);
    if (tocOverlay) tocOverlay.addEventListener("click", closeSidebar);

    tocLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 1024) {
                closeSidebar();
            }
        });
    });

    // =====================================
    // 2. ACTIVE TOC HEADING TRACKING (SCROLLSPY)
    // =====================================
    const sections = document.querySelectorAll(".blog-content section[id]");

    if (sections.length > 0 && "IntersectionObserver" in window) {
        const observerOptions = {
            root: null,
            rootMargin: "-120px 0px -70% 0px",
            threshold: 0
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.getAttribute("id");
                    tocLinks.forEach(link => {
                        if (link.getAttribute("href") === `#${activeId}`) {
                            link.classList.add("active");
                            // Auto scroll TOC sidebar if needed
                            if (tocSidebar && window.innerWidth > 1024) {
                                const linkTop = link.offsetTop;
                                const sidebarScroll = tocSidebar.scrollTop;
                                const sidebarHeight = tocSidebar.clientHeight;
                                if (linkTop < sidebarScroll + 50 || linkTop > sidebarScroll + sidebarHeight - 50) {
                                    tocSidebar.scrollTo({
                                        top: linkTop - 80,
                                        behavior: "smooth"
                                    });
                                }
                            }
                        } else {
                            link.classList.remove("active");
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    // =====================================
    // 3. COPY CODE BLOCK CLIPBOARD HANDLER
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
                textarea.style.left = "-999999px";
                textarea.style.top = "-999999px";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand("copy");
                textarea.remove();
            }

            const originalText = copyBtn.innerHTML;
            copyBtn.textContent = "✓ Copied!";
            copyBtn.style.background = "#10B981";

            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = "";
            }, 2000);
        } catch (err) {
            console.error("Failed to copy code: ", err);
            copyBtn.textContent = "Error";
            setTimeout(() => {
                copyBtn.textContent = "Copy";
            }, 2000);
        }
    });

    // =====================================
    // 4. NAVBAR SCROLL EFFECT
    // =====================================
    const nav = document.getElementById("nav") || document.querySelector(".header");
    if (nav) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }
        });
    }
});
