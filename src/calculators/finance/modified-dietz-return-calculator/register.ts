import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ModifiedDietzReturnCalculator } from './ModifiedDietzReturnCalculator';

export function registerModifiedDietzReturnCalculator(): void {
  calculatorRegistry.register(ModifiedDietzReturnCalculator);
}

export { ModifiedDietzReturnCalculator };
