import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { OpenAIImageResult } from '../../types/openAIResult';
import { DirectServiceIO } from '../utils/directServiceIO';
import { Response } from '../../types/response';
import { DeepChat } from '../../deepChat';
export declare class OpenAIImagesIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    getKeyLink: string;
    private static readonly IMAGE_GENERATION_URL;
    private static readonly IMAGE_VARIATIONS_URL;
    private static readonly IMAGE_EDIT_URL;
    introPanelMarkUp: string;
    url: string;
    permittedErrorPrefixes: string[];
    constructor(deepChat: DeepChat);
    private static canFileSendMessage;
    private static createFormDataBody;
    private preprocessBody;
    private callApiWithImage;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[], files?: File[]): Promise<void>;
    extractResultData(result: OpenAIImageResult): Promise<Response>;
}
//# sourceMappingURL=openAIImagesIO.d.ts.map