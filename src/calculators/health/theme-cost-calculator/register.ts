import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ThemeCostCalculator } from './ThemeCostCalculator';

export function registerThemeCostCalculator(): void {
  calculatorRegistry.register(ThemeCostCalculator);
}

export { ThemeCostCalculator };
