import { Calculator } from '../../engines/CalculatorEngine';
import { market_cap_calculatorCalculatorInputs, market_cap_calculatorCalculatorResults, market_cap_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class market_cap_calculatorCalculatorCalculator implements Calculator<market_cap_calculatorCalculatorInputs, market_cap_calculatorCalculatorResults> {
  readonly id = 'market_cap_calculatorCalculator';
  readonly name = 'market_cap_calculatorCalculator Calculator';
  readonly description = 'Calculate market_cap_calculatorCalculator values';

  calculate(inputs: market_cap_calculatorCalculatorInputs): market_cap_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: market_cap_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: market_cap_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
