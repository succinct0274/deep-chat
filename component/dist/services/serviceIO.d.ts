import { CameraFilesServiceConfig, FilesServiceConfig, MicrophoneFilesServiceConfig } from '../types/fileServiceConfigs';
import { IWebsocketHandler } from '../utils/HTTP/customHandler';
import { Messages } from '../views/chat/messages/messages';
import { InterfacesUnion } from '../types/utilityTypes';
import { FetchFunc } from '../utils/HTTP/requestUtils';
import { FILE_TYPES } from '../types/fileTypes';
import { Response } from '../types/response';
import { Request } from '../types/request';
import { Signals } from '../types/handler';
import { DeepChat } from '../deepChat';
import { Demo } from '../types/demo';
export interface RequestContents {
    text?: string;
    files?: File[];
}
export type PollResult = Promise<InterfacesUnion<Response | {
    timeoutMS: number;
}>>;
export interface CompletionsHandlers {
    onFinish: () => void;
}
export interface StreamHandlers {
    onOpen: () => void;
    onClose: () => void;
    abortStream: AbortController;
    stopClicked: Signals['stopClicked'];
    simulationInterim?: number;
}
export interface KeyVerificationHandlers {
    onSuccess: () => void;
    onFail: (message: string) => void;
    onLoad: () => void;
}
export type FileServiceIO = FilesServiceConfig & {
    infoModalTextMarkUp?: string;
};
export type CustomErrors = string[];
export type ServiceFileTypes = {
    [key in FILE_TYPES]?: FileServiceIO;
};
export interface ServiceIO {
    key?: string;
    validateConfigKey: boolean;
    insertKeyPlaceholderText?: string;
    getKeyLink?: string;
    url?: string;
    websocket?: WebSocket | 'pending' | IWebsocketHandler;
    completionsHandlers: CompletionsHandlers;
    streamHandlers: StreamHandlers;
    isTextInputDisabled?: boolean;
    textInputPlaceholderText?: string;
    fileTypes: ServiceFileTypes;
    camera?: CameraFilesServiceConfig;
    recordAudio?: MicrophoneFilesServiceConfig;
    requestSettings: Request;
    introPanelMarkUp?: string;
    permittedErrorPrefixes?: CustomErrors;
    canSendMessage: (text?: string, files?: File[], isProgrammatic?: boolean) => boolean;
    verifyKey(key: string, keyVerificationHandlers: KeyVerificationHandlers): void;
    callAPI(requestContents: RequestContents, messages: Messages): Promise<void>;
    extractResultData?(result: object, fetch?: FetchFunc, previousBody?: object): Promise<InterfacesUnion<Response | {
        makingAnotherRequest: true;
    }>>;
    extractPollResultData?(result: object): PollResult;
    demo?: Demo;
    deepChat: DeepChat;
    isDirectConnection(): boolean;
    isWebModel(): boolean;
    isSubmitProgrammaticallyDisabled?: boolean;
    sessionId?: string;
}
//# sourceMappingURL=serviceIO.d.ts.map