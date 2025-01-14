import { FileAttachments } from '../../fileAttachments/fileAttachments';
import { SubmitButtonStyles } from '../../../../../types/submitButton';
import { UserContentI } from '../../../../../types/messagesInternal';
import { ServiceIO } from '../../../../../services/serviceIO';
import { UserContent } from '../../../../../types/messages';
import { Messages } from '../../../messages/messages';
import { DeepChat } from '../../../../../deepChat';
import { InputButton } from '../inputButton';
import { DefinedButtonStateStyles } from '../../../../../types/buttonInternal';
type Styles = Omit<DefinedButtonStateStyles<SubmitButtonStyles>, 'alwaysEnabled'>;
export declare class SubmitButton extends InputButton<Styles> {
    private static readonly SUBMIT_CLASS;
    private static readonly LOADING_CLASS;
    private static readonly DISABLED_CLASS;
    private readonly _serviceIO;
    private readonly _messages;
    private readonly _inputElementRef;
    private readonly _abortStream;
    private readonly _stopClicked;
    private readonly _innerElements;
    private readonly _fileAttachments;
    private readonly _alwaysEnabled;
    private _isSVGLoadingIconOverriden;
    private _validationHandler?;
    readonly status: {
        requestInProgress: boolean;
        loadingActive: boolean;
    };
    constructor(deepChat: DeepChat, inputElementRef: HTMLElement, messages: Messages, serviceIO: ServiceIO, fileAttachments: FileAttachments);
    private createInnerElements;
    private static createButtonContainerElement;
    private static createSubmitIconElement;
    private static createLoadingIconElement;
    private static createStopIconElement;
    private createDisabledIconElement;
    private attemptOverwriteLoadingStyle;
    private assignHandlers;
    private resetSubmit;
    submitFromInput(): Promise<void>;
    programmaticSubmit(content: UserContent): Promise<void>;
    attemptSubmit(content: UserContentI, isProgrammatic?: boolean): Promise<void>;
    private addNewMessage;
    private stopStream;
    private changeToStopIcon;
    private changeToLoadingIcon;
    changeToSubmitIcon(): void;
    changeToDisabledIcon(isProgrammatic?: boolean): void;
    private disableSubmitButton;
}
export {};
//# sourceMappingURL=submitButton.d.ts.map