import { Calculator } from '../../engines/CalculatorEngine';
import { passport_cost_calculatorCalculatorInputs, passport_cost_calculatorCalculatorResults, passport_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class passport_cost_calculatorCalculatorCalculator implements Calculator<passport_cost_calculatorCalculatorInputs, passport_cost_calculatorCalculatorResults> {
  readonly id = 'passport_cost_calculatorCalculator';
  readonly name = 'passport_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate passport_cost_calculatorCalculator values';

  calculate(inputs: passport_cost_calculatorCalculatorInputs): passport_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: passport_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: passport_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
