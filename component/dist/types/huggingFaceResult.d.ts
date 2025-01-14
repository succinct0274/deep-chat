import { InterfacesUnion } from './utilityTypes';
export interface HuggingFaceError {
    error: string | string[];
    estimated_time?: number;
}
export type HuggingFaceConversationResult = InterfacesUnion<{
    generated_text: string;
} | HuggingFaceError>;
export type HuggingFaceTextGenerationResult = InterfacesUnion<{
    generated_text: string;
}[] | HuggingFaceError>;
export type HuggingFaceSummarizationResult = InterfacesUnion<{
    summary_text: string;
}[] | HuggingFaceError>;
export type HuggingFaceTranslationResult = InterfacesUnion<{
    translation_text: string;
}[] | HuggingFaceError>;
export type HuggingFaceFillMaskResult = InterfacesUnion<{
    sequence: string;
}[] | HuggingFaceError>;
export type HuggingFaceQuestionAnswerResult = InterfacesUnion<{
    answer: string;
} | HuggingFaceError>;
export type HuggingFaceAudioRecognitionResult = InterfacesUnion<{
    text: string;
} | HuggingFaceError>;
export type HuggingFaceClassificationResult = InterfacesUnion<{
    label: string;
}[] | HuggingFaceError>;
//# sourceMappingURL=huggingFaceResult.d.ts.map