import { Calculator } from '../../engines/CalculatorEngine';
import { 401k_calculatorCalculatorInputs, 401k_calculatorCalculatorResults, 401k_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class 401k_calculatorCalculatorCalculator implements Calculator<401k_calculatorCalculatorInputs, 401k_calculatorCalculatorResults> {
  readonly id = '401k_calculatorCalculator';
  readonly name = '401k_calculatorCalculator Calculator';
  readonly description = 'Calculate 401k_calculatorCalculator values';

  calculate(inputs: 401k_calculatorCalculatorInputs): 401k_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: 401k_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: 401k_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
