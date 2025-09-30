import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HerbalMedicineCostCalculator } from './HerbalMedicineCostCalculator';

export function registerHerbalMedicineCostCalculator(): void {
  calculatorRegistry.register(HerbalMedicineCostCalculator);
}

export { HerbalMedicineCostCalculator };
