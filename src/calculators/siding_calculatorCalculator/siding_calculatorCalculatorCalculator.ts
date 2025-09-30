import { Calculator } from '../../engines/CalculatorEngine';
import { siding_calculatorCalculatorInputs, siding_calculatorCalculatorResults, siding_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class siding_calculatorCalculatorCalculator implements Calculator<siding_calculatorCalculatorInputs, siding_calculatorCalculatorResults> {
  readonly id = 'siding_calculatorCalculator';
  readonly name = 'siding_calculatorCalculator Calculator';
  readonly description = 'Calculate siding_calculatorCalculator values';

  calculate(inputs: siding_calculatorCalculatorInputs): siding_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: siding_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: siding_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
