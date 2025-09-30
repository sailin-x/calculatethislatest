import { Calculator } from '../../engines/CalculatorEngine';
import { registerRequiredMinimumDistributionRmdCalculatorInputs, registerRequiredMinimumDistributionRmdCalculatorResults, registerRequiredMinimumDistributionRmdCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerRequiredMinimumDistributionRmdCalculatorCalculator implements Calculator<registerRequiredMinimumDistributionRmdCalculatorInputs, registerRequiredMinimumDistributionRmdCalculatorResults> {
  readonly id = 'registerRequiredMinimumDistributionRmdCalculator';
  readonly name = 'registerRequiredMinimumDistributionRmdCalculator Calculator';
  readonly description = 'Calculate registerRequiredMinimumDistributionRmdCalculator values';

  calculate(inputs: registerRequiredMinimumDistributionRmdCalculatorInputs): registerRequiredMinimumDistributionRmdCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerRequiredMinimumDistributionRmdCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerRequiredMinimumDistributionRmdCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
