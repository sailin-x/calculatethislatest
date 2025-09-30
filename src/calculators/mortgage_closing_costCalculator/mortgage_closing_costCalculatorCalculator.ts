import { Calculator } from '../../engines/CalculatorEngine';
import { mortgage_closing_costCalculatorInputs, mortgage_closing_costCalculatorResults, mortgage_closing_costCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgage_closing_costCalculatorCalculator implements Calculator<mortgage_closing_costCalculatorInputs, mortgage_closing_costCalculatorResults> {
  readonly id = 'mortgage_closing_costCalculator';
  readonly name = 'mortgage_closing_costCalculator Calculator';
  readonly description = 'Calculate mortgage_closing_costCalculator values';

  calculate(inputs: mortgage_closing_costCalculatorInputs): mortgage_closing_costCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgage_closing_costCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgage_closing_costCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
