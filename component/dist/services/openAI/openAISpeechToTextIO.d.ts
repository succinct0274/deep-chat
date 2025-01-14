import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { OpenAIAudioResult } from '../../types/openAIResult';
import { DirectServiceIO } from '../utils/directServiceIO';
import { Response } from '../../types/response';
import { DeepChat } from '../../deepChat';
export declare class OpenAISpeechToTextIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    getKeyLink: string;
    private static readonly AUDIO_TRANSCRIPTIONS_URL;
    private static readonly AUDIO_TRANSLATIONS_URL;
    private static readonly DEFAULT_MODEL;
    introPanelMarkUp: string;
    url: string;
    permittedErrorPrefixes: string[];
    textInputPlaceholderText: string;
    private _service_url;
    constructor(deepChat: DeepChat);
    private static canSendFileMessage;
    private processConfig;
    private static cleanConfig;
    private static createFormDataBody;
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[], files?: File[]): Promise<void>;
    extractResultData(result: OpenAIAudioResult): Promise<Response>;
}
//# sourceMappingURL=openAISpeechToTextIO.d.ts.map