import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HighNetWorthDivorceCalculator } from './HighNetWorthDivorceCalculator';

export function registerHighNetWorthDivorceCalculator(): void {
  calculatorRegistry.register(HighNetWorthDivorceCalculator);
}

export { HighNetWorthDivorceCalculator };
