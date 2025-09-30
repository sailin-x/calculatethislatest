import { calculatorRegistry } from '../../data/calculatorRegistry';
import { health_savings_account_hsa_calculatorCalculatorCalculator } from './health_savings_account_hsa_calculatorCalculatorCalculator';

export function registerhealth_savings_account_hsa_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new health_savings_account_hsa_calculatorCalculatorCalculator());
}
