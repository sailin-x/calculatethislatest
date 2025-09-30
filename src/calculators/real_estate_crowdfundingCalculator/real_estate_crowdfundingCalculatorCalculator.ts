import { Calculator } from '../../engines/CalculatorEngine';
import { real_estate_crowdfundingCalculatorInputs, real_estate_crowdfundingCalculatorResults, real_estate_crowdfundingCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class real_estate_crowdfundingCalculatorCalculator implements Calculator<real_estate_crowdfundingCalculatorInputs, real_estate_crowdfundingCalculatorResults> {
  readonly id = 'real_estate_crowdfundingCalculator';
  readonly name = 'real_estate_crowdfundingCalculator Calculator';
  readonly description = 'Calculate real_estate_crowdfundingCalculator values';

  calculate(inputs: real_estate_crowdfundingCalculatorInputs): real_estate_crowdfundingCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: real_estate_crowdfundingCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: real_estate_crowdfundingCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
