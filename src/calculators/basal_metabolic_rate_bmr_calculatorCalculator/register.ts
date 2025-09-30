import { calculatorRegistry } from '../../data/calculatorRegistry';
import { basal_metabolic_rate_bmr_calculatorCalculatorCalculator } from './basal_metabolic_rate_bmr_calculatorCalculatorCalculator';

export function registerbasal_metabolic_rate_bmr_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new basal_metabolic_rate_bmr_calculatorCalculatorCalculator());
}
