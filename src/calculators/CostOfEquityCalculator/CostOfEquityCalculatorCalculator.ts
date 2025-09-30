import { Calculator } from '../../engines/CalculatorEngine';
import { CostOfEquityCalculatorInputs, CostOfEquityCalculatorResults, CostOfEquityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class CostOfEquityCalculatorCalculator implements Calculator<CostOfEquityCalculatorInputs, CostOfEquityCalculatorResults> {
  readonly id = 'CostOfEquityCalculator';
  readonly name = 'CostOfEquityCalculator Calculator';
  readonly description = 'Calculate CostOfEquityCalculator values';

  calculate(inputs: CostOfEquityCalculatorInputs): CostOfEquityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: CostOfEquityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: CostOfEquityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
