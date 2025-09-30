import { Calculator } from '../../engines/CalculatorEngine';
import { roaming_cost_calculatorCalculatorInputs, roaming_cost_calculatorCalculatorResults, roaming_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class roaming_cost_calculatorCalculatorCalculator implements Calculator<roaming_cost_calculatorCalculatorInputs, roaming_cost_calculatorCalculatorResults> {
  readonly id = 'roaming_cost_calculatorCalculator';
  readonly name = 'roaming_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate roaming_cost_calculatorCalculator values';

  calculate(inputs: roaming_cost_calculatorCalculatorInputs): roaming_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: roaming_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: roaming_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
