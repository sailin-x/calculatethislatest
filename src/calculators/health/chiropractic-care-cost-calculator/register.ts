import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ChiropracticCareCostCalculator } from './ChiropracticCareCostCalculator';

export function registerChiropracticCareCostCalculator(): void {
  calculatorRegistry.register(ChiropracticCareCostCalculator);
}

export { ChiropracticCareCostCalculator };
