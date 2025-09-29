export const formatDate = (date) => {
    return new Date(date).toLocaleString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};