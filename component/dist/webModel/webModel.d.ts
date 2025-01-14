import { IntroMessage } from '../types/messages';
import { BaseServiceIO } from '../services/utils/baseServiceIO';
import * as WebLLM from '../types/webModel/webLLM/webLLM';
import { MessageContentI } from '../types/messagesInternal';
import { Messages } from '../views/chat/messages/messages';
import { DeepChat } from '../deepChat';
declare global {
    interface Window {
        webLLM: typeof WebLLM;
    }
}
export declare class WebModel extends BaseServiceIO {
    private static chat?;
    private static readonly GENERIC_ERROR;
    private static readonly MULTIPLE_MODELS_ERROR;
    private static readonly WEB_LLM_NOT_FOUND_ERROR;
    private static readonly DEFAULT_MODEL;
    static readonly MODULE_SEARCH_LIMIT_S = 5;
    private _isModelLoaded;
    private _isModelLoading;
    private _loadOnFirstMessage;
    private readonly _webModel;
    permittedErrorPrefixes: string[];
    private readonly _conversationHistory;
    private readonly _chatEl?;
    private _removeIntro?;
    private _messages?;
    constructor(deepChat: DeepChat);
    setUpMessages(messages: Messages): void;
    private static setUpHistory;
    private findModelInWindow;
    private shouldAddInitialMessage;
    private scrollToTop;
    getIntroMessage(customIntroMessage?: IntroMessage): {
        role: string;
        html: string;
        sendUpdate: boolean;
    } | undefined;
    private configureInit;
    private init;
    private attemptToCreateChat;
    private getConfig;
    private loadModel;
    private generateResp;
    private immediateResp;
    private streamResp;
    private canSubmit;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    private unloadChat;
    isWebModel(): boolean;
    private static clearAllCache;
    private static clearCache;
}
//# sourceMappingURL=webModel.d.ts.map