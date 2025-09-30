import { Calculator } from '../../engines/CalculatorEngine';
import { registerMarketingROICalculatorInputs, registerMarketingROICalculatorResults, registerMarketingROICalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerMarketingROICalculatorCalculator implements Calculator<registerMarketingROICalculatorInputs, registerMarketingROICalculatorResults> {
  readonly id = 'registerMarketingROICalculator';
  readonly name = 'registerMarketingROICalculator Calculator';
  readonly description = 'Calculate registerMarketingROICalculator values';

  calculate(inputs: registerMarketingROICalculatorInputs): registerMarketingROICalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerMarketingROICalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerMarketingROICalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
