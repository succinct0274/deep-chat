import { DirectServiceIO } from '../utils/directServiceIO';
import { APIKey } from '../../types/APIKey';
import { DeepChat } from '../../deepChat';
export declare class CohereIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    getKeyLink: string;
    textInputPlaceholderText: string;
    permittedErrorPrefixes: string[];
    url: string;
    constructor(deepChat: DeepChat, url: string, inputPlaceholder: string, config?: true | Object, apiKey?: APIKey);
}
//# sourceMappingURL=cohereIO.d.ts.map