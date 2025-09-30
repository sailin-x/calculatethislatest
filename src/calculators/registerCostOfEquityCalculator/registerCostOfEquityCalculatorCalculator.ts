import { Calculator } from '../../engines/CalculatorEngine';
import { registerCostOfEquityCalculatorInputs, registerCostOfEquityCalculatorResults, registerCostOfEquityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerCostOfEquityCalculatorCalculator implements Calculator<registerCostOfEquityCalculatorInputs, registerCostOfEquityCalculatorResults> {
  readonly id = 'registerCostOfEquityCalculator';
  readonly name = 'registerCostOfEquityCalculator Calculator';
  readonly description = 'Calculate registerCostOfEquityCalculator values';

  calculate(inputs: registerCostOfEquityCalculatorInputs): registerCostOfEquityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerCostOfEquityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerCostOfEquityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
