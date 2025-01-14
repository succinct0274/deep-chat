import { CameraFilesServiceConfig, FilesServiceConfig, MicrophoneFilesServiceConfig } from './types/fileServiceConfigs';
import { MessageContent, IntroMessage, MessageStyles, UserContent, OnNewMessage } from './types/messages';
import { DisableSubmitButton, SubmitButtonStyles } from './types/submitButton';
import { RequestInterceptor, ResponseInterceptor } from './types/interceptors';
import { InsertKeyViewStyles } from './types/insertKeyViewStyles';
import { InternalHTML } from './utils/webComponent/internalHTML';
import { ValidationHandler } from './types/validationHandler';
import { DirectConnection } from './types/directConnection';
import { TextToSpeechConfig } from './types/textToSpeech';
import { SpeechToTextConfig } from './types/microphone';
import { ErrorMessages, OnError } from './types/error';
import { RequestBodyLimits } from './types/chatLimits';
import { ValidateInput } from './types/validateInput';
import { WebModel } from './types/webModel/webModel';
import { DropupStyles } from './types/dropupStyles';
import { HTMLClassUtilities } from './types/html';
import { ServiceIO } from './services/serviceIO';
import { TextInput } from './types/textInput';
import { CustomStyle } from './types/styles';
import { Request } from './types/request';
import { Avatars } from './types/avatars';
import { Stream } from './types/stream';
import { Names } from './types/names';
import { Demo } from './types/demo';
import { AttachmentObject } from './views/chat/input/fileAttachments/fileAttachmentTypes/fileAttachmentsType';
export declare class DeepChat extends InternalHTML {
    onAttachmentChange?: (attachemnts: AttachmentObject[], newFile: File) => void;
    directConnection?: DirectConnection;
    request?: Request;
    webModel?: WebModel;
    stream?: Stream;
    requestBodyLimits?: RequestBodyLimits;
    requestInterceptor?: RequestInterceptor;
    responseInterceptor?: ResponseInterceptor;
    validateInput?: ValidateInput;
    chatStyle?: CustomStyle;
    attachmentContainerStyle?: CustomStyle;
    dropupStyles?: DropupStyles;
    inputAreaStyle?: CustomStyle;
    textInput?: TextInput;
    submitButtonStyles?: SubmitButtonStyles;
    auxiliaryStyle?: string;
    initialMessages?: MessageContent[];
    introMessage?: IntroMessage;
    avatars?: Avatars;
    names?: Names;
    displayLoadingBubble?: boolean;
    errorMessages?: ErrorMessages;
    messageStyles?: MessageStyles;
    textToSpeech?: boolean | TextToSpeechConfig;
    speechToText?: boolean | SpeechToTextConfig;
    images?: boolean | FilesServiceConfig;
    gifs?: boolean | FilesServiceConfig;
    camera?: boolean | CameraFilesServiceConfig;
    audio?: boolean | FilesServiceConfig;
    microphone?: boolean | MicrophoneFilesServiceConfig;
    mixedFiles?: boolean | FilesServiceConfig;
    dragAndDrop?: boolean | CustomStyle;
    introPanelStyle?: CustomStyle;
    htmlClassUtilities?: HTMLClassUtilities;
    getMessages: () => MessageContent[];
    submitUserMessage: (content: UserContent) => void;
    focusInput: () => void;
    refreshMessages: () => void;
    clearMessages: (isReset?: boolean) => void;
    scrollToBottom: () => void;
    disableSubmitButton: DisableSubmitButton;
    onNewMessage: OnNewMessage;
    onClearMessages: () => void;
    onComponentRender: () => void;
    onError: OnError;
    demo?: Demo;
    _hasBeenRendered: boolean;
    _auxiliaryStyleApplied: boolean;
    _activeService?: ServiceIO;
    _childElement?: HTMLElement;
    _validationHandler?: ValidationHandler;
    _insertKeyViewStyles?: InsertKeyViewStyles;
    constructor();
    private readonly _elementRef;
    private changeToChatView;
    onRender(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'deep-chat': DeepChat;
    }
}
//# sourceMappingURL=deepChat.d.ts.map