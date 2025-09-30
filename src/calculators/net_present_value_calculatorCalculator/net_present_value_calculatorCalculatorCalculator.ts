import { Calculator } from '../../engines/CalculatorEngine';
import { net_present_value_calculatorCalculatorInputs, net_present_value_calculatorCalculatorResults, net_present_value_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class net_present_value_calculatorCalculatorCalculator implements Calculator<net_present_value_calculatorCalculatorInputs, net_present_value_calculatorCalculatorResults> {
  readonly id = 'net_present_value_calculatorCalculator';
  readonly name = 'net_present_value_calculatorCalculator Calculator';
  readonly description = 'Calculate net_present_value_calculatorCalculator values';

  calculate(inputs: net_present_value_calculatorCalculatorInputs): net_present_value_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: net_present_value_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: net_present_value_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
