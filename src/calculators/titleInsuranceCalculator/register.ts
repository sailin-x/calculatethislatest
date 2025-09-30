import { calculatorRegistry } from '../../data/calculatorRegistry';
import { titleInsuranceCalculatorCalculator } from './titleInsuranceCalculatorCalculator';

export function registertitleInsuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new titleInsuranceCalculatorCalculator());
}
