import { Calculator } from '../../engines/CalculatorEngine';
import { calculus_calculatorCalculatorInputs, calculus_calculatorCalculatorResults, calculus_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class calculus_calculatorCalculatorCalculator implements Calculator<calculus_calculatorCalculatorInputs, calculus_calculatorCalculatorResults> {
  readonly id = 'calculus_calculatorCalculator';
  readonly name = 'calculus_calculatorCalculator Calculator';
  readonly description = 'Calculate calculus_calculatorCalculator values';

  calculate(inputs: calculus_calculatorCalculatorInputs): calculus_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: calculus_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: calculus_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
