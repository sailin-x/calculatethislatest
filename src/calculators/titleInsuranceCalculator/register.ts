import { calculatorRegistry } from '../../data/calculatorRegistry';
import { titleInsuranceCalculator } from './titleInsuranceCalculator';

export function registertitleInsuranceCalculator(): void {
  calculatorRegistry.register(new titleInsuranceCalculator());
}
