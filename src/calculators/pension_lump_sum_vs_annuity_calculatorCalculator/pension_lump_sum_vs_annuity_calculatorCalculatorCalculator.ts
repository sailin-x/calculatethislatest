import { Calculator } from '../../engines/CalculatorEngine';
import { pension_lump_sum_vs_annuity_calculatorCalculatorInputs, pension_lump_sum_vs_annuity_calculatorCalculatorResults, pension_lump_sum_vs_annuity_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class pension_lump_sum_vs_annuity_calculatorCalculatorCalculator implements Calculator<pension_lump_sum_vs_annuity_calculatorCalculatorInputs, pension_lump_sum_vs_annuity_calculatorCalculatorResults> {
  readonly id = 'pension_lump_sum_vs_annuity_calculatorCalculator';
  readonly name = 'pension_lump_sum_vs_annuity_calculatorCalculator Calculator';
  readonly description = 'Calculate pension_lump_sum_vs_annuity_calculatorCalculator values';

  calculate(inputs: pension_lump_sum_vs_annuity_calculatorCalculatorInputs): pension_lump_sum_vs_annuity_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: pension_lump_sum_vs_annuity_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: pension_lump_sum_vs_annuity_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
