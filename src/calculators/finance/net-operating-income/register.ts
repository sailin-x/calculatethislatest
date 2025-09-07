import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { NetOperatingIncomeCalculator } from './NetOperatingIncomeCalculator';

export function registerNetOperatingIncomeCalculator(): void {
  calculatorRegistry.register(NetOperatingIncomeCalculator);
}