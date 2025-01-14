import { InterfacesUnion } from './utilityTypes';
export type OpenAITextToSpeech = {
    model?: string;
    voice?: string;
    speed?: number;
};
export type OpenAISpeechToText = {
    model?: string;
    temperature?: number;
    language?: string;
    type?: 'transcription' | 'translation';
};
export interface OpenAIImages {
    model?: string;
    n?: number;
    size?: '256x256' | '512x512' | '1024x1024';
    response_format?: 'url' | 'b64_json';
    user?: string;
}
export type FunctionsDetails = {
    name: string;
    arguments: string;
}[];
export type AssistantFunctionHandlerResponse = string[] | Promise<string[]>;
export type AssistantFunctionHandler = (functionsDetails: FunctionsDetails) => AssistantFunctionHandlerResponse;
export interface OpenAIAssistant {
    assistant_id: string;
    function_handler?: AssistantFunctionHandler;
}
export type ChatFunctionHandlerResponse = InterfacesUnion<{
    response: string;
}[] | {
    text: string;
}>;
export type ChatFunctionHandler = (functionsDetails: FunctionsDetails) => ChatFunctionHandlerResponse | Promise<ChatFunctionHandlerResponse>;
export interface OpenAIChatFunctions {
    tools?: {
        type: 'function' | 'object';
        function: {
            name: string;
            description?: string;
            parameters: object;
        };
    }[];
    tool_choice?: 'auto' | {
        type: 'function';
        function: {
            name: string;
        };
    };
    function_handler?: ChatFunctionHandler;
}
export type OpenAIChat = {
    system_prompt?: string;
    model?: string;
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
} & OpenAIChatFunctions;
export interface OpenAI {
    chat?: true | OpenAIChat;
    assistant?: OpenAIAssistant;
    images?: true | OpenAIImages;
    textToSpeech?: true | OpenAITextToSpeech;
    speechToText?: true | OpenAISpeechToText;
}
//# sourceMappingURL=openAI.d.ts.map