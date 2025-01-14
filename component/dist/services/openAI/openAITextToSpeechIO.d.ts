import { OpenAITextToSpeechResult } from '../../types/openAIResult';
import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { DirectServiceIO } from '../utils/directServiceIO';
import { Response } from '../../types/response';
import { DeepChat } from '../../deepChat';
export declare class OpenAITextToSpeechIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    getKeyLink: string;
    url: string;
    permittedErrorPrefixes: string[];
    private static readonly DEFAULT_MODEL;
    private static readonly DEFAULT_VOIDE;
    textInputPlaceholderText: string;
    introPanelMarkUp: string;
    constructor(deepChat: DeepChat);
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: OpenAITextToSpeechResult): Promise<Response>;
}
//# sourceMappingURL=openAITextToSpeechIO.d.ts.map