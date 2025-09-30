import { Calculator } from '../../engines/CalculatorEngine';
import { net_margin_calculatorCalculatorInputs, net_margin_calculatorCalculatorResults, net_margin_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class net_margin_calculatorCalculatorCalculator implements Calculator<net_margin_calculatorCalculatorInputs, net_margin_calculatorCalculatorResults> {
  readonly id = 'net_margin_calculatorCalculator';
  readonly name = 'net_margin_calculatorCalculator Calculator';
  readonly description = 'Calculate net_margin_calculatorCalculator values';

  calculate(inputs: net_margin_calculatorCalculatorInputs): net_margin_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: net_margin_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: net_margin_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
