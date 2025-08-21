/**
 * HTML 특수 문자를 이스케이프하여 XSS 공격을 방지
 */
declare function escapeHtml(unsafe: string): string;
/**
 * JavaScript 문자열을 안전하게 이스케이프
 */
declare function escapeJavaScript(unsafe: string): string;
/**
 * URL 매개변수를 안전하게 인코딩
 */
declare function sanitizeUrl(url: string): string;
/**
 * 허용된 HTML 태그만 남기고 나머지는 제거
 */
declare function sanitizeHtml(input: string, allowedTags?: string[]): string;
/**
 * 입력값 검증 및 정화
 */
declare function validateAndSanitizeInput(input: string, maxLength?: number): string;
/**
 * DOM에 안전하게 텍스트 삽입
 */
declare function safeSetTextContent(element: HTMLElement, text: string): void;
/**
 * DOM에 안전하게 HTML 삽입 (허용된 태그만)
 */
declare function safeSetInnerHTML(element: HTMLElement, html: string, allowedTags?: string[]): void;
export { escapeHtml, escapeJavaScript, sanitizeUrl, sanitizeHtml, validateAndSanitizeInput, safeSetTextContent, safeSetInnerHTML };
//# sourceMappingURL=xss.d.ts.map