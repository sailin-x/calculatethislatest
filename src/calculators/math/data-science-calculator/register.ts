import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DataScienceCalculator } from './DataScienceCalculator';

export function registerDataScienceCalculator(): void {
  calculatorRegistry.register(DataScienceCalculator);
}

export { DataScienceCalculator };
