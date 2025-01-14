import { DirectServiceIO } from '../utils/directServiceIO';
import { BuildHeadersFunc } from '../../types/headers';
import { ServiceFileTypes } from '../serviceIO';
import { APIKey } from '../../types/APIKey';
import { DeepChat } from '../../deepChat';
export declare class AzureSpeechIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    getKeyLink: string;
    constructor(deepChat: DeepChat, buildHeadersFunc: BuildHeadersFunc, region: string, apiKey?: APIKey, existingFileTypes?: ServiceFileTypes);
}
//# sourceMappingURL=azureSpeechIO.d.ts.map