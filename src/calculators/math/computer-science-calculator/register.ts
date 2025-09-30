import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ComputerScienceCalculator } from './ComputerScienceCalculator';

export function registerComputerScienceCalculator(): void {
  calculatorRegistry.register(ComputerScienceCalculator);
}

export { ComputerScienceCalculator };
