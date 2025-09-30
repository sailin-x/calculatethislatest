import { Calculator } from '../../engines/CalculatorEngine';
import { fixed_index_annuity_calculatorCalculatorInputs, fixed_index_annuity_calculatorCalculatorResults, fixed_index_annuity_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fixed_index_annuity_calculatorCalculatorCalculator implements Calculator<fixed_index_annuity_calculatorCalculatorInputs, fixed_index_annuity_calculatorCalculatorResults> {
  readonly id = 'fixed_index_annuity_calculatorCalculator';
  readonly name = 'fixed_index_annuity_calculatorCalculator Calculator';
  readonly description = 'Calculate fixed_index_annuity_calculatorCalculator values';

  calculate(inputs: fixed_index_annuity_calculatorCalculatorInputs): fixed_index_annuity_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fixed_index_annuity_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fixed_index_annuity_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
