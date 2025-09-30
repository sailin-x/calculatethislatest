import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hotel_feasibility_adrCalculatorCalculator } from './hotel_feasibility_adrCalculatorCalculator';

export function registerhotel_feasibility_adrCalculatorCalculator(): void {
  calculatorRegistry.register(new hotel_feasibility_adrCalculatorCalculator());
}
