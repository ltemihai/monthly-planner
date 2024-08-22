import { LocalStorageKeys } from "../enums/localStorageKeys.enum";
import { stringifyJson } from "../helpers/json.helpers";
import { setLocalStorageValue } from "../helpers/localStorage.helpers";

export const GptService = (() => {
    let apiKey: string | null

    const setApiKey = (key: string): void => {
        apiKey = key;
        setLocalStorageValue(LocalStorageKeys.GPT_API_KEY, apiKey);
    }

    const hasApiKey = (): boolean => {
        return !!apiKey;
    }

    const generateText = async (prompt: string): Promise<string> => {
        if (!apiKey) {
            throw new Error('API Key not set');
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: stringifyJson({
                model: 'gpt-4o-mini',
                messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
                max_tokens: 150
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate text');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    return {
        setApiKey,
        hasApiKey,
        generateText
    };
})

export default GptService;