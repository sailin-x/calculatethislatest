import { calculatorRegistry } from '../../data/calculatorRegistry';
import { employee_turnover_cost_calculatorCalculatorCalculator } from './employee_turnover_cost_calculatorCalculatorCalculator';

export function registeremployee_turnover_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new employee_turnover_cost_calculatorCalculatorCalculator());
}
