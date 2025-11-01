import { calculatorRegistry } from '../../data/calculatorRegistry';
import { roiCalculator } from './roiCalculator';

export function registerroiCalculator(): void {
  calculatorRegistry.register(new roiCalculator());
}
