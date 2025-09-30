import { calculatorRegistry } from '../../data/calculatorRegistry';
import { technical_debt_calculatorCalculatorCalculator } from './technical_debt_calculatorCalculatorCalculator';

export function registertechnical_debt_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new technical_debt_calculatorCalculatorCalculator());
}
