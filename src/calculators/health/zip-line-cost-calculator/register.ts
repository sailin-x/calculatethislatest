import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ZipLineCostCalculator } from './ZipLineCostCalculator';

export function registerZipLineCostCalculator(): void {
  calculatorRegistry.register(ZipLineCostCalculator);
}

export { ZipLineCostCalculator };
