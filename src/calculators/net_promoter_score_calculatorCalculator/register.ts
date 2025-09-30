import { calculatorRegistry } from '../../data/calculatorRegistry';
import { net_promoter_score_calculatorCalculatorCalculator } from './net_promoter_score_calculatorCalculatorCalculator';

export function registernet_promoter_score_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new net_promoter_score_calculatorCalculatorCalculator());
}
