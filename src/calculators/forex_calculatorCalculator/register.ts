import { calculatorRegistry } from '../../data/calculatorRegistry';
import { forex_calculatorCalculatorCalculator } from './forex_calculatorCalculatorCalculator';

export function registerforex_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new forex_calculatorCalculatorCalculator());
}
