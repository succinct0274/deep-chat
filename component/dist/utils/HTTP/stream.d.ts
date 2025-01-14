import { ServiceIO, StreamHandlers } from '../../services/serviceIO';
import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseI } from '../../types/response';
import { Stream as StreamI } from '../../types/stream';
export declare class Stream {
    static request(io: ServiceIO, body: object, messages: Messages, stringifyBody?: boolean): Promise<void>;
    private static onInterceptorError;
    static simulate(messages: Messages, sh: StreamHandlers, result: ResponseI): void;
    private static populateMessages;
    static isSimulation(stream?: StreamI): boolean;
    private static abort;
}
//# sourceMappingURL=stream.d.ts.map