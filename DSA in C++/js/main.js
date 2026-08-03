document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("nav") || document.querySelector(".header");

    if (!nav) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check on page load
});
