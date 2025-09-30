import { calculatorRegistry } from '../../data/calculatorRegistry';
import { price_fixing_overcharge_estimatorCalculatorCalculator } from './price_fixing_overcharge_estimatorCalculatorCalculator';

export function registerprice_fixing_overcharge_estimatorCalculatorCalculator(): void {
  calculatorRegistry.register(new price_fixing_overcharge_estimatorCalculatorCalculator());
}
