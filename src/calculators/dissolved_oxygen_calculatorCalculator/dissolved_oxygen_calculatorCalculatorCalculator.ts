import { Calculator } from '../../engines/CalculatorEngine';
import { dissolved_oxygen_calculatorCalculatorInputs, dissolved_oxygen_calculatorCalculatorResults, dissolved_oxygen_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class dissolved_oxygen_calculatorCalculatorCalculator implements Calculator<dissolved_oxygen_calculatorCalculatorInputs, dissolved_oxygen_calculatorCalculatorResults> {
  readonly id = 'dissolved_oxygen_calculatorCalculator';
  readonly name = 'dissolved_oxygen_calculatorCalculator Calculator';
  readonly description = 'Calculate dissolved_oxygen_calculatorCalculator values';

  calculate(inputs: dissolved_oxygen_calculatorCalculatorInputs): dissolved_oxygen_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: dissolved_oxygen_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: dissolved_oxygen_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
