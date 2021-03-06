export interface StringHandlerInterface {
    removeCommand(str: string): string
    removeNewLine(str: string): string
    capitalize(str: string): string
    wrapByBraces(str: string | number): string
    getCommand(str: string): string
    compose(strings: string[]): string
    makeId(length: number): string
}
