import { AssemblyAIResult } from '../../types/assemblyAIResult';
import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { DirectServiceIO } from '../utils/directServiceIO';
import { Response } from '../../types/response';
import { DeepChat } from '../../deepChat';
export declare class AssemblyAIAudioIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    getKeyLink: string;
    introPanelMarkUp: string;
    url: string;
    isTextInputDisabled: boolean;
    textInputPlaceholderText: string;
    permittedErrorPrefixes: string[];
    constructor(deepChat: DeepChat);
    private static canFileSendMessage;
    callServiceAPI(messages: Messages, _: MessageContentI[], files?: File[]): Promise<void>;
    extractResultData(result: AssemblyAIResult): Promise<Response>;
}
//# sourceMappingURL=assemblyAIAudioIO.d.ts.map