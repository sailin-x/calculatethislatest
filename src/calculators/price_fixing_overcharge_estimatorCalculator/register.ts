import { calculatorRegistry } from '../../data/calculatorRegistry';
import { price_fixing_overcharge_estimatorCalculator } from './price_fixing_overcharge_estimatorCalculator';

export function registerprice_fixing_overcharge_estimatorCalculator(): void {
  calculatorRegistry.register(new price_fixing_overcharge_estimatorCalculator());
}
