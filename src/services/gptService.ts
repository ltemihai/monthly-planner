class GptService {
    private static instance: GptService;
    private apiKey: string | null;

    private constructor() {
        this.apiKey = localStorage.getItem('gptApiKey');
    }

    public static getInstance(): GptService {
        if (!GptService.instance) {
            GptService.instance = new GptService();
        }
        return GptService.instance;
    }

    setApiKey(apiKey: string) {
        this.apiKey = apiKey;
        localStorage.setItem('gptApiKey', apiKey);
    }

    hasApiKey(): boolean {
        return !!this.apiKey;
    }

    async generateText(prompt: string): Promise<string> {
        if (!this.apiKey) {
            throw new Error('API Key not set');
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
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
}

export default GptService;