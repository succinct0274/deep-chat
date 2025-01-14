import { FileServiceIO } from '../../../../../services/serviceIO';
import { CustomStyle } from '../../../../../types/styles';
export declare class Modal {
    static readonly MODAL_CLOSE_TIMEOUT_MS = 190;
    readonly _contentRef: HTMLElement;
    private readonly _elementRef;
    private readonly _backgroundPanelRef;
    private readonly _buttonPanel;
    private _isOpen;
    extensionCloseCallback?: () => void;
    constructor(viewContainerElement: HTMLElement, contentClasses: string[], containerStyle?: CustomStyle);
    isOpen(): boolean;
    private static createContainer;
    private static createModalContent;
    private static createButtonPanel;
    private static createDarkBackgroundPanel;
    addButtons(...buttons: HTMLElement[]): void;
    private static createTextButton;
    static createSVGButton(svgString: string): HTMLDivElement;
    close(): void;
    displayModalElements(): void;
    private openTextModal;
    addCloseButton(text: string, isSVG: boolean, callback?: () => void): HTMLDivElement;
    static createTextModalFunc(viewContainerElement: HTMLElement, fileIO: FileServiceIO, closeCallback: () => void): (() => void) | undefined;
    private addWindowEvents;
}
//# sourceMappingURL=modal.d.ts.map