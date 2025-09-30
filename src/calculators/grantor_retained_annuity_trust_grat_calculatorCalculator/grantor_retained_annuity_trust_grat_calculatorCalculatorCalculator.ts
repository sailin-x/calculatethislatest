import { Calculator } from '../../engines/CalculatorEngine';
import { grantor_retained_annuity_trust_grat_calculatorCalculatorInputs, grantor_retained_annuity_trust_grat_calculatorCalculatorResults, grantor_retained_annuity_trust_grat_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class grantor_retained_annuity_trust_grat_calculatorCalculatorCalculator implements Calculator<grantor_retained_annuity_trust_grat_calculatorCalculatorInputs, grantor_retained_annuity_trust_grat_calculatorCalculatorResults> {
  readonly id = 'grantor_retained_annuity_trust_grat_calculatorCalculator';
  readonly name = 'grantor_retained_annuity_trust_grat_calculatorCalculator Calculator';
  readonly description = 'Calculate grantor_retained_annuity_trust_grat_calculatorCalculator values';

  calculate(inputs: grantor_retained_annuity_trust_grat_calculatorCalculatorInputs): grantor_retained_annuity_trust_grat_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: grantor_retained_annuity_trust_grat_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: grantor_retained_annuity_trust_grat_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
