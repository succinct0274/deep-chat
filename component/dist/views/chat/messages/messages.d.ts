import { MessageFile, MessageFileType } from '../../../types/messageFile';
import { ServiceIO } from '../../../services/serviceIO';
import { ErrorMessageOverrides } from '../../../types/error';
import { ResponseI } from '../../../types/responseInternal';
import { DemoResponse } from '../../../types/demo';
import { MessagesBase } from './messagesBase';
import { DeepChat } from '../../../deepChat';
export interface MessageElements {
    outerContainer: HTMLElement;
    innerContainer: HTMLElement;
    bubbleElement: HTMLElement;
}
export declare class Messages extends MessagesBase {
    private readonly _errorMessageOverrides?;
    private readonly _onClearMessages?;
    private readonly _onError?;
    private readonly _displayLoadingMessage?;
    private readonly _permittedErrorPrefixes?;
    private readonly _displayServiceErrorMessages?;
    private _introMessage?;
    customDemoResponse?: DemoResponse;
    constructor(deepChat: DeepChat, serviceIO: ServiceIO, panel?: HTMLElement);
    private static getDisplayLoadingMessage;
    private prepareDemo;
    private addSetupMessageIfNeeded;
    private addIntroductoryMessage;
    removeIntroductoryMessage(): void;
    private populateInitialMessages;
    addNewMessage(data: ResponseI, isInitial?: boolean): void;
    private updateStateOnMessage;
    private removeMessageOnError;
    addNewErrorMessage(type: keyof Omit<ErrorMessageOverrides, 'default'>, message?: string): void;
    private static checkPermittedErrorPrefixes;
    private getPermittedMessage;
    isLastMessageError(): boolean | undefined;
    removeError(): void;
    addLoadingMessage(): void;
    private populateIntroPanel;
    addMultipleFiles(filesData: {
        file: File;
        type: MessageFileType;
    }[]): Promise<MessageFile[]>;
    private clearMessages;
}
//# sourceMappingURL=messages.d.ts.map