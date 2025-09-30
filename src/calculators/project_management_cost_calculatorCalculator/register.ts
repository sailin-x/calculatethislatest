import { calculatorRegistry } from '../../data/calculatorRegistry';
import { project_management_cost_calculatorCalculatorCalculator } from './project_management_cost_calculatorCalculatorCalculator';

export function registerproject_management_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new project_management_cost_calculatorCalculatorCalculator());
}
