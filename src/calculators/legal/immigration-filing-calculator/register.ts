import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ImmigrationFilingCalculator } from './ImmigrationFilingCalculator';

export function registerImmigrationFilingCalculator(): void {
  calculatorRegistry.register(ImmigrationFilingCalculator);
}

export { ImmigrationFilingCalculator };
