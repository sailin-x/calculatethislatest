import { Calculator } from '../../engines/CalculatorEngine';
import { customer_acquisition_cost_calculatorCalculatorInputs, customer_acquisition_cost_calculatorCalculatorResults, customer_acquisition_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class customer_acquisition_cost_calculatorCalculatorCalculator implements Calculator<customer_acquisition_cost_calculatorCalculatorInputs, customer_acquisition_cost_calculatorCalculatorResults> {
  readonly id = 'customer_acquisition_cost_calculatorCalculator';
  readonly name = 'customer_acquisition_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate customer_acquisition_cost_calculatorCalculator values';

  calculate(inputs: customer_acquisition_cost_calculatorCalculatorInputs): customer_acquisition_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: customer_acquisition_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: customer_acquisition_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
