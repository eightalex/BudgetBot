export interface NumberHandlerInterface {
    isFinite(value: any): boolean
    makePositive(number: number): number
    makeNegative(number: number): number
    prepareMonoAmount(amount: number): number
    prepareValue(value: string | number, makeNegative: boolean): number
    getValueFromBraces(str: string): number
}
