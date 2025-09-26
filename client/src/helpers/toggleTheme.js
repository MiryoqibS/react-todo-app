export const toggleTheme = (setTheme) => {
    setTheme((prev) => {
        const newTheme = prev === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        return newTheme;
    })
};