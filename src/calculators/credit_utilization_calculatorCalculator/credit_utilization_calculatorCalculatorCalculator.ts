import { Calculator } from '../../engines/CalculatorEngine';
import { credit_utilization_calculatorCalculatorInputs, credit_utilization_calculatorCalculatorResults, credit_utilization_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class credit_utilization_calculatorCalculatorCalculator implements Calculator<credit_utilization_calculatorCalculatorInputs, credit_utilization_calculatorCalculatorResults> {
  readonly id = 'credit_utilization_calculatorCalculator';
  readonly name = 'credit_utilization_calculatorCalculator Calculator';
  readonly description = 'Calculate credit_utilization_calculatorCalculator values';

  calculate(inputs: credit_utilization_calculatorCalculatorInputs): credit_utilization_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: credit_utilization_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: credit_utilization_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
