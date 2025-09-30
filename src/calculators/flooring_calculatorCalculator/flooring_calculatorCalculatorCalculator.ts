import { Calculator } from '../../engines/CalculatorEngine';
import { flooring_calculatorCalculatorInputs, flooring_calculatorCalculatorResults, flooring_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class flooring_calculatorCalculatorCalculator implements Calculator<flooring_calculatorCalculatorInputs, flooring_calculatorCalculatorResults> {
  readonly id = 'flooring_calculatorCalculator';
  readonly name = 'flooring_calculatorCalculator Calculator';
  readonly description = 'Calculate flooring_calculatorCalculator values';

  calculate(inputs: flooring_calculatorCalculatorInputs): flooring_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: flooring_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: flooring_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
