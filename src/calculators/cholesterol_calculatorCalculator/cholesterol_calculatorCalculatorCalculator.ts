import { Calculator } from '../../engines/CalculatorEngine';
import { cholesterol_calculatorCalculatorInputs, cholesterol_calculatorCalculatorResults, cholesterol_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cholesterol_calculatorCalculatorCalculator implements Calculator<cholesterol_calculatorCalculatorInputs, cholesterol_calculatorCalculatorResults> {
  readonly id = 'cholesterol_calculatorCalculator';
  readonly name = 'cholesterol_calculatorCalculator Calculator';
  readonly description = 'Calculate cholesterol_calculatorCalculator values';

  calculate(inputs: cholesterol_calculatorCalculatorInputs): cholesterol_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cholesterol_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cholesterol_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
