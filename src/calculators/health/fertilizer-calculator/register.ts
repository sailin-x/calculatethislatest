import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FertilizerCalculator } from './FertilizerCalculator';

export function registerFertilizerCalculator(): void {
  calculatorRegistry.register(FertilizerCalculator);
}

export { FertilizerCalculator };
