import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { DirectServiceIO } from '../utils/directServiceIO';
import { DeepChat } from '../../deepChat';
import { PollResult } from '../serviceIO';
import { OpenAIAssistantInitReqResult, OpenAIRunResult } from '../../types/openAIResult';
export declare class OpenAIAssistantIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    getKeyLink: string;
    url: string;
    private static readonly THREAD_PREFIX;
    private static readonly POLLING_TIMEOUT_MS;
    private readonly _functionHandler?;
    permittedErrorPrefixes: string[];
    private messages?;
    private run_id?;
    private searchedForThreadId;
    constructor(deepChat: DeepChat);
    private processMessage;
    private createNewThreadMessages;
    private callService;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[], files?: File[]): Promise<void>;
    private searchPreviousMessagesForThreadId;
    extractResultData(result: OpenAIAssistantInitReqResult): Promise<{
        makingAnotherRequest: true;
    }>;
    private assignThreadAndRun;
    extractPollResultData(result: OpenAIRunResult): PollResult;
    private handleTools;
}
//# sourceMappingURL=openAIAssistantIO.d.ts.map