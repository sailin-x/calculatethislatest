import { calculatorRegistry } from '../../data/calculatorRegistry';
import { title_insuranceCalculator } from './title_insuranceCalculator';

export function registertitle_insuranceCalculator(): void {
  calculatorRegistry.register(new title_insuranceCalculator());
}
