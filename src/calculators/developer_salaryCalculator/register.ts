import { calculatorRegistry } from '../../data/calculatorRegistry';
import { developer_salaryCalculator } from './developer_salaryCalculator';

export function registerdeveloper_salaryCalculator(): void {
  calculatorRegistry.register(new developer_salaryCalculator());
}
