import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { DirectServiceIO } from '../utils/directServiceIO';
import { HuggingFaceModel } from '../../types/huggingFace';
import { ServiceFileTypes } from '../serviceIO';
import { APIKey } from '../../types/APIKey';
import { DeepChat } from '../../deepChat';
type HuggingFaceServiceConfigObj = {
    parameters?: object;
    options?: object;
    context?: string;
};
type HuggingFaceServiceConfig = true | (HuggingFaceModel & HuggingFaceServiceConfigObj);
export declare class HuggingFaceIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    getKeyLink: string;
    private static readonly URL_PREFIX;
    introPanelMarkUp: string;
    permittedErrorPrefixes: string[];
    url: string;
    textInputPlaceholderText: string;
    constructor(deepChat: DeepChat, textInputPlaceholderText: string, defaultModel: string, config?: HuggingFaceServiceConfig, apiKey?: APIKey, existingFileTypes?: ServiceFileTypes);
    preprocessBody(body: HuggingFaceServiceConfigObj, messages: MessageContentI[], _?: File[]): {
        parameters?: object | undefined;
        options?: (object & {
            wait_for_model?: boolean | undefined;
        }) | undefined;
        context?: string | undefined;
        inputs: string;
    } | undefined;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[], files?: File[]): Promise<void>;
}
export {};
//# sourceMappingURL=huggingFaceIO.d.ts.map