import { DropupMenuStyles } from '../../../../types/dropupStyles';
import { InputButton } from '../buttons/inputButton';
export declare class DropupMenu {
    readonly elementRef: HTMLElement;
    private _isOpen;
    highlightedItem?: HTMLElement;
    private readonly _styles?;
    constructor(containerElement: HTMLElement, styles?: DropupMenuStyles);
    private static createElement;
    private open;
    close(): void;
    toggle(): void;
    addItem(inputButton: InputButton): void;
    private addWindowEvents;
}
//# sourceMappingURL=dropupMenu.d.ts.map