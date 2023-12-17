import { KeyVerificationDetails } from '../../../types/keyVerificationDetails';
import { Messages } from '../../../views/chat/messages/messages';
import { ServiceIO } from '../../serviceIO';
export declare class OpenAIUtils {
    static buildHeaders(key: string): {
        Authorization: string;
        'Content-Type': string;
    };
    private static handleVerificationResult;
    static buildKeyVerificationDetails(): KeyVerificationDetails;
    static storeFiles(serviceIO: ServiceIO, messages: Messages, files: File[]): Promise<string[] | undefined>;
    static directFetch(serviceIO: ServiceIO, body: any, method: 'POST' | 'GET', stringify?: boolean): Promise<any>;
}
//# sourceMappingURL=openAIUtils.d.ts.map