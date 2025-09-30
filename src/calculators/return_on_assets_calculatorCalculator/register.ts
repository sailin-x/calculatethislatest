import { calculatorRegistry } from '../../data/calculatorRegistry';
import { return_on_assets_calculatorCalculatorCalculator } from './return_on_assets_calculatorCalculatorCalculator';

export function registerreturn_on_assets_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new return_on_assets_calculatorCalculatorCalculator());
}
