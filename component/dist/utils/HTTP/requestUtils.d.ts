import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseT } from '../../types/response';
import { RequestDetails } from '../../types/interceptors';
import { ServiceIO } from '../../services/serviceIO';
import { GenericObject } from '../../types/object';
import { Request } from '../../types/request';
import { DeepChat } from '../../deepChat';
export type FetchFunc = (body: any) => Promise<Response>;
type InterceptorResult = Promise<RequestDetails & {
    error?: string;
}>;
export declare class RequestUtils {
    static readonly CONTENT_TYPE = "Content-Type";
    static tempRemoveContentHeader(requestSettings: Request | undefined, request: (stringifyBody?: boolean) => Promise<unknown>, stringifyBody: boolean): Promise<unknown>;
    static displayError(messages: Messages, err: object, defMessage?: string): void;
    static fetch(io: ServiceIO, headers: GenericObject<string> | undefined, stringifyBody: boolean, body: any): Promise<Response>;
    static processResponseByType(response: Response): Promise<any> | Response;
    static processRequestInterceptor(deepChat: DeepChat, requestDetails: RequestDetails): InterceptorResult;
    static validateResponseFormat(response: ResponseT): boolean;
}
export {};
//# sourceMappingURL=requestUtils.d.ts.map