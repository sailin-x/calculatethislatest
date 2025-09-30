import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BariatricSurgeryCalculator } from './BariatricSurgeryCalculator';

export function registerBariatricSurgeryCalculator(): void {
  calculatorRegistry.register(BariatricSurgeryCalculator);
}

export { BariatricSurgeryCalculator };
