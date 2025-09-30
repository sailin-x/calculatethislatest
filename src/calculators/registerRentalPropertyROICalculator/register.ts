import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRentalPropertyROICalculatorCalculator } from './registerRentalPropertyROICalculatorCalculator';

export function registerregisterRentalPropertyROICalculatorCalculator(): void {
  calculatorRegistry.register(new registerRentalPropertyROICalculatorCalculator());
}
