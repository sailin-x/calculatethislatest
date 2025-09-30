import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DirectorsOfficersCalculator } from './DirectorsOfficersCalculator';

export function registerDirectorsOfficersCalculator(): void {
  calculatorRegistry.register(DirectorsOfficersCalculator);
}

export { DirectorsOfficersCalculator };
