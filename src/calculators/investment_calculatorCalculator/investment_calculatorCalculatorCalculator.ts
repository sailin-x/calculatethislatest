import { Calculator } from '../../engines/CalculatorEngine';
import { investment_calculatorCalculatorInputs, investment_calculatorCalculatorResults, investment_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class investment_calculatorCalculatorCalculator implements Calculator<investment_calculatorCalculatorInputs, investment_calculatorCalculatorResults> {
  readonly id = 'investment_calculatorCalculator';
  readonly name = 'investment_calculatorCalculator Calculator';
  readonly description = 'Calculate investment_calculatorCalculator values';

  calculate(inputs: investment_calculatorCalculatorInputs): investment_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: investment_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: investment_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
