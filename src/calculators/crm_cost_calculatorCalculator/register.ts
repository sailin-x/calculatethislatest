import { calculatorRegistry } from '../../data/calculatorRegistry';
import { crm_cost_calculatorCalculatorCalculator } from './crm_cost_calculatorCalculatorCalculator';

export function registercrm_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new crm_cost_calculatorCalculatorCalculator());
}
