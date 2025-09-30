import { Calculator } from '../../engines/CalculatorEngine';
import { net_operating_incomeCalculatorInputs, net_operating_incomeCalculatorResults, net_operating_incomeCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class net_operating_incomeCalculatorCalculator implements Calculator<net_operating_incomeCalculatorInputs, net_operating_incomeCalculatorResults> {
  readonly id = 'net_operating_incomeCalculator';
  readonly name = 'net_operating_incomeCalculator Calculator';
  readonly description = 'Calculate net_operating_incomeCalculator values';

  calculate(inputs: net_operating_incomeCalculatorInputs): net_operating_incomeCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: net_operating_incomeCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: net_operating_incomeCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
