import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fund_level_irr_calculatorCalculatorCalculator } from './fund_level_irr_calculatorCalculatorCalculator';

export function registerfund_level_irr_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new fund_level_irr_calculatorCalculatorCalculator());
}
