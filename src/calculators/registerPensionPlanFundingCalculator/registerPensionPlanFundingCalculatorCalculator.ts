import { Calculator } from '../../engines/CalculatorEngine';
import { registerPensionPlanFundingCalculatorInputs, registerPensionPlanFundingCalculatorResults, registerPensionPlanFundingCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerPensionPlanFundingCalculatorCalculator implements Calculator<registerPensionPlanFundingCalculatorInputs, registerPensionPlanFundingCalculatorResults> {
  readonly id = 'registerPensionPlanFundingCalculator';
  readonly name = 'registerPensionPlanFundingCalculator Calculator';
  readonly description = 'Calculate registerPensionPlanFundingCalculator values';

  calculate(inputs: registerPensionPlanFundingCalculatorInputs): registerPensionPlanFundingCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerPensionPlanFundingCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerPensionPlanFundingCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
