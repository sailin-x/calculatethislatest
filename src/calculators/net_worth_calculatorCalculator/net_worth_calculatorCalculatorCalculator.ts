import { Calculator } from '../../engines/CalculatorEngine';
import { net_worth_calculatorCalculatorInputs, net_worth_calculatorCalculatorResults, net_worth_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class net_worth_calculatorCalculatorCalculator implements Calculator<net_worth_calculatorCalculatorInputs, net_worth_calculatorCalculatorResults> {
  readonly id = 'net_worth_calculatorCalculator';
  readonly name = 'net_worth_calculatorCalculator Calculator';
  readonly description = 'Calculate net_worth_calculatorCalculator values';

  calculate(inputs: net_worth_calculatorCalculatorInputs): net_worth_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: net_worth_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: net_worth_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
