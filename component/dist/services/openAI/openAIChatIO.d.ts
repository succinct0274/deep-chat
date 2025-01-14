import { OpenAIConverseResult } from '../../types/openAIResult';
import { FetchFunc } from '../../utils/HTTP/requestUtils';
import { OpenAIChat } from '../../types/openAI';
import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseT } from '../../types/response';
import { DirectServiceIO } from '../utils/directServiceIO';
import { DeepChat } from '../../deepChat';
export declare class OpenAIChatIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    getKeyLink: string;
    url: string;
    permittedErrorPrefixes: string[];
    private readonly _functionHandler?;
    private readonly _systemMessage;
    constructor(deepChat: DeepChat);
    private static generateSystemMessage;
    private cleanConfig;
    private static getContent;
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: OpenAIConverseResult, fetchFunc?: FetchFunc, prevBody?: OpenAIChat): Promise<ResponseT>;
    private handleTools;
}
//# sourceMappingURL=openAIChatIO.d.ts.map