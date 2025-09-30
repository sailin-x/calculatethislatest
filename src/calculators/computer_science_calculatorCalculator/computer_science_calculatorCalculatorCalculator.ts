import { Calculator } from '../../engines/CalculatorEngine';
import { computer_science_calculatorCalculatorInputs, computer_science_calculatorCalculatorResults, computer_science_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class computer_science_calculatorCalculatorCalculator implements Calculator<computer_science_calculatorCalculatorInputs, computer_science_calculatorCalculatorResults> {
  readonly id = 'computer_science_calculatorCalculator';
  readonly name = 'computer_science_calculatorCalculator Calculator';
  readonly description = 'Calculate computer_science_calculatorCalculator values';

  calculate(inputs: computer_science_calculatorCalculatorInputs): computer_science_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: computer_science_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: computer_science_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
