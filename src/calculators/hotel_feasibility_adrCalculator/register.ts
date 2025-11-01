import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hotel_feasibility_adrCalculator } from './hotel_feasibility_adrCalculator';

export function registerhotel_feasibility_adrCalculator(): void {
  calculatorRegistry.register(new hotel_feasibility_adrCalculator());
}
