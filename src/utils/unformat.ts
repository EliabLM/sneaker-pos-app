export const unformat = (formattedValue: string) => {
    // Elimina caracteres no numéricos excepto el punto decimal
    const rawValue = formattedValue.replace(/[^0-9.-]+/g, "");
    return parseFloat(rawValue) || 0; // Convierte a número o devuelve 0 si no es válido
};
