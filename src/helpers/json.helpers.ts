// Parse function to convert JSON string to a generic type
const parseJson = <T>(jsonString: string): T => {
    if (!jsonString) return null as T;
    return jsonString.startsWith('{') ? JSON.parse(jsonString) as T : jsonString as T
}

// Stringify function to convert a generic type to JSON string
const stringifyJson = <T>(data: T): string => {
    return JSON.stringify(data);
}

export { parseJson, stringifyJson };