import { InterfacesUnion } from './utilityTypes';
export interface OpenAIAssistantInitReqResult {
    id: string;
    thread_id: string;
    error?: {
        code: string;
        message: string;
    };
}
export interface OpenAIAssistantMessagesResult {
    data: {
        content: {
            text: {
                value: string;
            };
        }[];
    }[];
}
export interface OpenAIRunResult {
    status: string;
    thread_id: string;
    required_action?: {
        submit_tool_outputs?: {
            tool_calls?: ToolCalls;
        };
    };
}
export type ToolCalls = {
    function: {
        name: string;
        arguments: string;
    };
    id: string;
}[];
export interface ToolAPI {
    tool_calls?: ToolCalls;
    tool_call_id?: string;
    name?: string;
}
export type OpenAIMessage = {
    role: 'user' | 'system' | 'ai' | 'tool';
    content: string;
} & ToolAPI;
export type OpenAITextToSpeechResult = Blob | {
    error?: {
        code: string;
        message: string;
    };
};
type ResultChoice = InterfacesUnion<{
    text: string;
} | {
    message: OpenAIMessage;
} | {
    delta: OpenAIMessage;
}>;
export interface OpenAIConverseResult {
    choices: ResultChoice[];
    usage: {
        total_tokens: number;
    };
    error?: {
        code: string;
        message: string;
    };
}
export interface OpenAIImageResult {
    data: InterfacesUnion<{
        url: string;
    } | {
        b64_json: string;
    }>[];
    error?: {
        code: string;
        message: string;
    };
}
export interface OpenAIAudioResult {
    text: string;
    error?: {
        code: string;
        message: string;
    };
}
export {};
//# sourceMappingURL=openAIResult.d.ts.map