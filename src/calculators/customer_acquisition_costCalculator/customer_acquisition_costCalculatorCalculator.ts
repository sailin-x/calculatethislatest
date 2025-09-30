import { Calculator } from '../../engines/CalculatorEngine';
import { customer_acquisition_costCalculatorInputs, customer_acquisition_costCalculatorResults, customer_acquisition_costCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class customer_acquisition_costCalculatorCalculator implements Calculator<customer_acquisition_costCalculatorInputs, customer_acquisition_costCalculatorResults> {
  readonly id = 'customer_acquisition_costCalculator';
  readonly name = 'customer_acquisition_costCalculator Calculator';
  readonly description = 'Calculate customer_acquisition_costCalculator values';

  calculate(inputs: customer_acquisition_costCalculatorInputs): customer_acquisition_costCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: customer_acquisition_costCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: customer_acquisition_costCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
