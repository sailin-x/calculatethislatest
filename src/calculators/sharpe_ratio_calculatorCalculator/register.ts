import { calculatorRegistry } from '../../data/calculatorRegistry';
import { sharpe_ratio_calculatorCalculatorCalculator } from './sharpe_ratio_calculatorCalculatorCalculator';

export function registersharpe_ratio_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new sharpe_ratio_calculatorCalculatorCalculator());
}
