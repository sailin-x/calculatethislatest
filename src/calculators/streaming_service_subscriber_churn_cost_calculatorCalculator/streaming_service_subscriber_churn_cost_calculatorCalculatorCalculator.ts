import { Calculator } from '../../engines/CalculatorEngine';
import { streaming_service_subscriber_churn_cost_calculatorCalculatorInputs, streaming_service_subscriber_churn_cost_calculatorCalculatorResults, streaming_service_subscriber_churn_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class streaming_service_subscriber_churn_cost_calculatorCalculatorCalculator implements Calculator<streaming_service_subscriber_churn_cost_calculatorCalculatorInputs, streaming_service_subscriber_churn_cost_calculatorCalculatorResults> {
  readonly id = 'streaming_service_subscriber_churn_cost_calculatorCalculator';
  readonly name = 'streaming_service_subscriber_churn_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate streaming_service_subscriber_churn_cost_calculatorCalculator values';

  calculate(inputs: streaming_service_subscriber_churn_cost_calculatorCalculatorInputs): streaming_service_subscriber_churn_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: streaming_service_subscriber_churn_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: streaming_service_subscriber_churn_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
