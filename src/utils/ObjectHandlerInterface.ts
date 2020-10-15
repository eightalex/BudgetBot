export interface ObjectHandlerInterface {
    isEqualFields(data: JSON, comparedFields: string[]): boolean
}
