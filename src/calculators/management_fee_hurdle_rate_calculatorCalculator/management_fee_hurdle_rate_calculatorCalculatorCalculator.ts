import { Calculator } from '../../engines/CalculatorEngine';
import { management_fee_hurdle_rate_calculatorCalculatorInputs, management_fee_hurdle_rate_calculatorCalculatorResults, management_fee_hurdle_rate_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class management_fee_hurdle_rate_calculatorCalculatorCalculator implements Calculator<management_fee_hurdle_rate_calculatorCalculatorInputs, management_fee_hurdle_rate_calculatorCalculatorResults> {
  readonly id = 'management_fee_hurdle_rate_calculatorCalculator';
  readonly name = 'management_fee_hurdle_rate_calculatorCalculator Calculator';
  readonly description = 'Calculate management_fee_hurdle_rate_calculatorCalculator values';

  calculate(inputs: management_fee_hurdle_rate_calculatorCalculatorInputs): management_fee_hurdle_rate_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: management_fee_hurdle_rate_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: management_fee_hurdle_rate_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
