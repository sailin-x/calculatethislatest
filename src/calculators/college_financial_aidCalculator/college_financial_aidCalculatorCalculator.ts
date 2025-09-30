import { Calculator } from '../../engines/CalculatorEngine';
import { college_financial_aidCalculatorInputs, college_financial_aidCalculatorResults, college_financial_aidCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class college_financial_aidCalculatorCalculator implements Calculator<college_financial_aidCalculatorInputs, college_financial_aidCalculatorResults> {
  readonly id = 'college_financial_aidCalculator';
  readonly name = 'college_financial_aidCalculator Calculator';
  readonly description = 'Calculate college_financial_aidCalculator values';

  calculate(inputs: college_financial_aidCalculatorInputs): college_financial_aidCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: college_financial_aidCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: college_financial_aidCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
