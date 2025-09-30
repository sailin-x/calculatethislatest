import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialFitnessCalculator } from './FinancialFitnessCalculator';

export function registerFinancialFitnessCalculator(): void {
  calculatorRegistry.register(FinancialFitnessCalculator);
}

export { FinancialFitnessCalculator };
