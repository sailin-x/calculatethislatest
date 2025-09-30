import { calculatorRegistry } from '../../data/calculatorRegistry';
import { developer_salaryCalculatorCalculator } from './developer_salaryCalculatorCalculator';

export function registerdeveloper_salaryCalculatorCalculator(): void {
  calculatorRegistry.register(new developer_salaryCalculatorCalculator());
}
