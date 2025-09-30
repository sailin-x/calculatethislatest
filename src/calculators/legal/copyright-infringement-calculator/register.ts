import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CopyrightInfringementCalculator } from './CopyrightInfringementCalculator';

export function registerCopyrightInfringementCalculator(): void {
  calculatorRegistry.register(CopyrightInfringementCalculator);
}

export { CopyrightInfringementCalculator };
