import { Calculator } from '../../engines/CalculatorEngine';
import { economic_value_added_eva_calculatorCalculatorInputs, economic_value_added_eva_calculatorCalculatorResults, economic_value_added_eva_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class economic_value_added_eva_calculatorCalculatorCalculator implements Calculator<economic_value_added_eva_calculatorCalculatorInputs, economic_value_added_eva_calculatorCalculatorResults> {
  readonly id = 'economic_value_added_eva_calculatorCalculator';
  readonly name = 'economic_value_added_eva_calculatorCalculator Calculator';
  readonly description = 'Calculate economic_value_added_eva_calculatorCalculator values';

  calculate(inputs: economic_value_added_eva_calculatorCalculatorInputs): economic_value_added_eva_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: economic_value_added_eva_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: economic_value_added_eva_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
