import { Calculator } from '../../engines/CalculatorEngine';
import { basal_metabolic_rate_bmr_calculatorCalculatorInputs, basal_metabolic_rate_bmr_calculatorCalculatorResults, basal_metabolic_rate_bmr_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class basal_metabolic_rate_bmr_calculatorCalculatorCalculator implements Calculator<basal_metabolic_rate_bmr_calculatorCalculatorInputs, basal_metabolic_rate_bmr_calculatorCalculatorResults> {
  readonly id = 'basal_metabolic_rate_bmr_calculatorCalculator';
  readonly name = 'basal_metabolic_rate_bmr_calculatorCalculator Calculator';
  readonly description = 'Calculate basal_metabolic_rate_bmr_calculatorCalculator values';

  calculate(inputs: basal_metabolic_rate_bmr_calculatorCalculatorInputs): basal_metabolic_rate_bmr_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: basal_metabolic_rate_bmr_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: basal_metabolic_rate_bmr_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
