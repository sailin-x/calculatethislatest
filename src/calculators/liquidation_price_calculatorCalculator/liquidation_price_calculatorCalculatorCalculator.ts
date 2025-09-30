import { Calculator } from '../../engines/CalculatorEngine';
import { liquidation_price_calculatorCalculatorInputs, liquidation_price_calculatorCalculatorResults, liquidation_price_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class liquidation_price_calculatorCalculatorCalculator implements Calculator<liquidation_price_calculatorCalculatorInputs, liquidation_price_calculatorCalculatorResults> {
  readonly id = 'liquidation_price_calculatorCalculator';
  readonly name = 'liquidation_price_calculatorCalculator Calculator';
  readonly description = 'Calculate liquidation_price_calculatorCalculator values';

  calculate(inputs: liquidation_price_calculatorCalculatorInputs): liquidation_price_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: liquidation_price_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: liquidation_price_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
