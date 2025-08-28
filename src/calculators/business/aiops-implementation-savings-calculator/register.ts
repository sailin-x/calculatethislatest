import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AIOpsImplementationSavingsCalculator } from './AIOpsImplementationSavingsCalculator';

export function registerAIOpsImplementationSavingsCalculator() {
  calculatorRegistry.register(AIOpsImplementationSavingsCalculator);
}
