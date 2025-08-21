"use strict";
// XSS 공격 방어를 위한 TypeScript 함수들
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeHtml = escapeHtml;
exports.escapeJavaScript = escapeJavaScript;
exports.sanitizeUrl = sanitizeUrl;
exports.sanitizeHtml = sanitizeHtml;
exports.validateAndSanitizeInput = validateAndSanitizeInput;
exports.safeSetTextContent = safeSetTextContent;
exports.safeSetInnerHTML = safeSetInnerHTML;
/**
 * HTML 특수 문자를 이스케이프하여 XSS 공격을 방지
 */
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
/**
 * JavaScript 문자열을 안전하게 이스케이프
 */
function escapeJavaScript(unsafe) {
    return unsafe
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t");
}
/**
 * URL 매개변수를 안전하게 인코딩
 */
function sanitizeUrl(url) {
    try {
        const urlObj = new URL(url);
        // javascript:, data:, vbscript: 등 위험한 프로토콜 차단
        const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
        if (!allowedProtocols.includes(urlObj.protocol)) {
            return '#';
        }
        return urlObj.href;
    }
    catch (_a) {
        return '#'; // 잘못된 URL인 경우 안전한 값으로 대체
    }
}
/**
 * 허용된 HTML 태그만 남기고 나머지는 제거
 */
function sanitizeHtml(input, allowedTags = ['b', 'i', 'em', 'strong']) {
    // 간단한 태그 필터링 (실제 프로덕션에서는 DOMPurify 등의 라이브러리 사용 권장)
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/gi;
    return input.replace(tagRegex, (match, tagName) => {
        if (allowedTags.includes(tagName.toLowerCase())) {
            return match;
        }
        return ''; // 허용되지 않은 태그는 제거
    });
}
/**
 * 입력값 검증 및 정화
 */
function validateAndSanitizeInput(input, maxLength = 1000) {
    if (typeof input !== 'string') {
        return '';
    }
    // 길이 제한
    if (input.length > maxLength) {
        input = input.substring(0, maxLength);
    }
    // 위험한 패턴 제거
    const dangerousPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi, // onclick, onload 등의 이벤트 핸들러
        /data:text\/html/gi,
        /vbscript:/gi
    ];
    dangerousPatterns.forEach(pattern => {
        input = input.replace(pattern, '');
    });
    return escapeHtml(input);
}
/**
 * DOM에 안전하게 텍스트 삽입
 */
function safeSetTextContent(element, text) {
    // innerHTML 대신 textContent 사용으로 XSS 방지
    element.textContent = text;
}
/**
 * DOM에 안전하게 HTML 삽입 (허용된 태그만)
 */
function safeSetInnerHTML(element, html, allowedTags) {
    const sanitized = sanitizeHtml(html, allowedTags);
    element.innerHTML = sanitized;
}
//# sourceMappingURL=xss.js.map