export const programmingLanguageExtMap = {
    js: "javascript",
    ts: "typescript",
    jsx: "javascript",
    tsx: "typescript",
    py: "python",
    java: "java",
    cpp: "cpp",
    c: "c",
    cs: "csharp",
    rb: "ruby",
    go: "go",
    php: "php",
    html: "html",
    css: "css",
    json: "json",
    md: "markdown",
}

export function getProgrammingLanguageFromFileName(fileName: string) {
    const fallbackLanguage = "plaintext";
    const parts = fileName.split(".");
    if (parts.length < 2) {
        return fallbackLanguage;
    }
    const ext = parts[parts.length - 1];
    return programmingLanguageExtMap[ext as keyof typeof programmingLanguageExtMap] || fallbackLanguage;
}