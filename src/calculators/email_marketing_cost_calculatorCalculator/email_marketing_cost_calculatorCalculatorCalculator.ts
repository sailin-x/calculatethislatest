import { Calculator } from '../../engines/CalculatorEngine';
import { email_marketing_cost_calculatorCalculatorInputs, email_marketing_cost_calculatorCalculatorResults, email_marketing_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class email_marketing_cost_calculatorCalculatorCalculator implements Calculator<email_marketing_cost_calculatorCalculatorInputs, email_marketing_cost_calculatorCalculatorResults> {
  readonly id = 'email_marketing_cost_calculatorCalculator';
  readonly name = 'email_marketing_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate email_marketing_cost_calculatorCalculator values';

  calculate(inputs: email_marketing_cost_calculatorCalculatorInputs): email_marketing_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: email_marketing_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: email_marketing_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
