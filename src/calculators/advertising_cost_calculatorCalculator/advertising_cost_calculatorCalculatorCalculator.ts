import { Calculator } from '../../engines/CalculatorEngine';
import { advertising_cost_calculatorCalculatorInputs, advertising_cost_calculatorCalculatorResults, advertising_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class advertising_cost_calculatorCalculatorCalculator implements Calculator<advertising_cost_calculatorCalculatorInputs, advertising_cost_calculatorCalculatorResults> {
  readonly id = 'advertising_cost_calculatorCalculator';
  readonly name = 'advertising_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate advertising_cost_calculatorCalculator values';

  calculate(inputs: advertising_cost_calculatorCalculatorInputs): advertising_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: advertising_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: advertising_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
