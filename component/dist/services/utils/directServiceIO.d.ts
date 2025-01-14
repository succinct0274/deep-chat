import { KeyVerificationDetails } from '../../types/keyVerificationDetails';
import { KeyVerificationHandlers, ServiceFileTypes } from '../serviceIO';
import { BuildHeadersFunc } from '../../types/headers';
import { BaseServiceIO } from './baseServiceIO';
import { APIKey } from '../../types/APIKey';
import { DeepChat } from '../../deepChat';
export declare class DirectServiceIO extends BaseServiceIO {
    key?: string;
    insertKeyPlaceholderText: string;
    getKeyLink: string;
    sessionId?: string;
    private readonly keyVerificationDetails;
    private readonly buildHeadersFunc;
    constructor(deepChat: DeepChat, keyVerificationDetails: KeyVerificationDetails, buildHeadersFunc: BuildHeadersFunc, apiKey?: APIKey, existingFileTypes?: ServiceFileTypes);
    private setApiKeyProperties;
    private buildRequestSettings;
    private keyAuthenticated;
    verifyKey(key: string, keyVerificationHandlers: KeyVerificationHandlers): void;
    isDirectConnection(): boolean;
}
//# sourceMappingURL=directServiceIO.d.ts.map