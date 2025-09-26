export const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-schema: dark)").matches;

    if (savedTheme) return savedTheme;
    if (prefersDark) return "dark";
    const hours = new Date().getHours();
    return hours < 6 || hours >= 21 ? "dark" : "light";
};