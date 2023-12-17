import { MessageContent, MessageStyles } from '../../../types/messages';
import { MessageFile } from '../../../types/messageFile';
import { MessagesBase } from './messagesBase';
import { MessageElements } from './messages';
export declare class FileMessageUtils {
    static readonly DEFAULT_FILE_NAME = "file";
    static addMessage(messages: MessagesBase, elements: MessageElements, styles: keyof MessageStyles, role: string): void;
    private static wrapInLink;
    static processContent(contentEl: HTMLElement, url?: string): HTMLElement;
    private static waitToLoadThenScroll;
    static scrollDownOnImageLoad(url: string, messagesContainerEl: HTMLElement): void;
    static reAddFileRefToObject(message: MessageContent, body: {
        message: MessageContent;
        isInitial: boolean;
    }): void;
    static removeFileRef(messageFile: MessageFile): Omit<MessageFile, 'file'>;
}
//# sourceMappingURL=fileMessageUtils.d.ts.map