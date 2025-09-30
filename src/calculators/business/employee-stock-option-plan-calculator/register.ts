import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EmployeeStockOptionPlanCalculator } from './EmployeeStockOptionPlanCalculator';

export function registerEmployeeStockOptionPlanCalculator(): void {
  calculatorRegistry.register(EmployeeStockOptionPlanCalculator);
}

export { EmployeeStockOptionPlanCalculator };
