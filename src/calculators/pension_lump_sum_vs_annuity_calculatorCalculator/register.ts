import { calculatorRegistry } from '../../data/calculatorRegistry';
import { pension_lump_sum_vs_annuity_calculatorCalculatorCalculator } from './pension_lump_sum_vs_annuity_calculatorCalculatorCalculator';

export function registerpension_lump_sum_vs_annuity_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new pension_lump_sum_vs_annuity_calculatorCalculatorCalculator());
}
