import { Calculator } from '../../engines/CalculatorEngine';
import { RequiredMinimumDistributionRmdCalculatorInputs, RequiredMinimumDistributionRmdCalculatorResults, RequiredMinimumDistributionRmdCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class RequiredMinimumDistributionRmdCalculatorCalculator implements Calculator<RequiredMinimumDistributionRmdCalculatorInputs, RequiredMinimumDistributionRmdCalculatorResults> {
  readonly id = 'RequiredMinimumDistributionRmdCalculator';
  readonly name = 'RequiredMinimumDistributionRmdCalculator Calculator';
  readonly description = 'Calculate RequiredMinimumDistributionRmdCalculator values';

  calculate(inputs: RequiredMinimumDistributionRmdCalculatorInputs): RequiredMinimumDistributionRmdCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: RequiredMinimumDistributionRmdCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: RequiredMinimumDistributionRmdCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
