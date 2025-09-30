import { Calculator } from '../../engines/CalculatorEngine';
import { public_transportation_cost_calculatorCalculatorInputs, public_transportation_cost_calculatorCalculatorResults, public_transportation_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class public_transportation_cost_calculatorCalculatorCalculator implements Calculator<public_transportation_cost_calculatorCalculatorInputs, public_transportation_cost_calculatorCalculatorResults> {
  readonly id = 'public_transportation_cost_calculatorCalculator';
  readonly name = 'public_transportation_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate public_transportation_cost_calculatorCalculator values';

  calculate(inputs: public_transportation_cost_calculatorCalculatorInputs): public_transportation_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: public_transportation_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: public_transportation_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
