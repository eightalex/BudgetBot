export interface MessageGeneratorInterface {
    getMessage(type: string, options?: {chatId?: string}): string
}
