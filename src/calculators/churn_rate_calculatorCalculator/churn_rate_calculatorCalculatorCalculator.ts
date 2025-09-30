import { Calculator } from '../../engines/CalculatorEngine';
import { churn_rate_calculatorCalculatorInputs, churn_rate_calculatorCalculatorResults, churn_rate_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class churn_rate_calculatorCalculatorCalculator implements Calculator<churn_rate_calculatorCalculatorInputs, churn_rate_calculatorCalculatorResults> {
  readonly id = 'churn_rate_calculatorCalculator';
  readonly name = 'churn_rate_calculatorCalculator Calculator';
  readonly description = 'Calculate churn_rate_calculatorCalculator values';

  calculate(inputs: churn_rate_calculatorCalculatorInputs): churn_rate_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: churn_rate_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: churn_rate_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
