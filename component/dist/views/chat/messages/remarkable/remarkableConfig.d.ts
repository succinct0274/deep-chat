import { Remarkable } from 'remarkable';
import hljs from 'highlight.js';
declare global {
    interface Window {
        hljs: typeof hljs;
    }
}
export declare class RemarkableConfig {
    static createNew(): Remarkable;
}
//# sourceMappingURL=remarkableConfig.d.ts.map