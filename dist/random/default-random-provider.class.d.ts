import { RandomProvider } from './random-provider.class';
export declare class DefaultRandomProvider implements RandomProvider {
    private random;
    constructor();
    numberBetween(min: number, max: number): number;
}
