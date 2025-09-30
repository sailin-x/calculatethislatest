import { Calculator } from '../../engines/CalculatorEngine';
import { pensionPlanFundingCalculatorInputs, pensionPlanFundingCalculatorResults, pensionPlanFundingCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class pensionPlanFundingCalculatorCalculator implements Calculator<pensionPlanFundingCalculatorInputs, pensionPlanFundingCalculatorResults> {
  readonly id = 'pensionPlanFundingCalculator';
  readonly name = 'pensionPlanFundingCalculator Calculator';
  readonly description = 'Calculate pensionPlanFundingCalculator values';

  calculate(inputs: pensionPlanFundingCalculatorInputs): pensionPlanFundingCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: pensionPlanFundingCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: pensionPlanFundingCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
