import { Calculator } from '../../engines/CalculatorEngine';
import { geometry_calculatorCalculatorInputs, geometry_calculatorCalculatorResults, geometry_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class geometry_calculatorCalculatorCalculator implements Calculator<geometry_calculatorCalculatorInputs, geometry_calculatorCalculatorResults> {
  readonly id = 'geometry_calculatorCalculator';
  readonly name = 'geometry_calculatorCalculator Calculator';
  readonly description = 'Calculate geometry_calculatorCalculator values';

  calculate(inputs: geometry_calculatorCalculatorInputs): geometry_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: geometry_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: geometry_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
