declare function getInvalidResponseMessage(result: object, messageType: string, isInterceptor: boolean, postInterceptor?: object): string;
export declare const ErrorMessages: {
    INVALID_KEY: string;
    CONNECTION_FAILED: string;
    INVALID_RESPONSE: typeof getInvalidResponseMessage;
    INVALID_STREAM_EVENT: string;
    INVALID_STREAM_EVENT_MIX: string;
    NO_VALID_STREAM_EVENTS_SENT: string;
};
export {};
//# sourceMappingURL=errorMessages.d.ts.map