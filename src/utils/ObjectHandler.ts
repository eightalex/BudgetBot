import {ObjectHandlerInterface} from './ObjectHandlerInterface';

export class ObjectHandler implements ObjectHandlerInterface {
    isEqualFields(data: JSON, comparedFields: string[]): boolean {
        const dataFields = Object.keys(data);
        return comparedFields.every((field, index) => dataFields[index] === field);
    }
}
