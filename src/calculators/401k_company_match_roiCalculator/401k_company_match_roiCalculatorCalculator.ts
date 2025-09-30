import { Calculator } from '../../engines/CalculatorEngine';
import { 401k_company_match_roiCalculatorInputs, 401k_company_match_roiCalculatorResults, 401k_company_match_roiCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class 401k_company_match_roiCalculatorCalculator implements Calculator<401k_company_match_roiCalculatorInputs, 401k_company_match_roiCalculatorResults> {
  readonly id = '401k_company_match_roiCalculator';
  readonly name = '401k_company_match_roiCalculator Calculator';
  readonly description = 'Calculate 401k_company_match_roiCalculator values';

  calculate(inputs: 401k_company_match_roiCalculatorInputs): 401k_company_match_roiCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: 401k_company_match_roiCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: 401k_company_match_roiCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
