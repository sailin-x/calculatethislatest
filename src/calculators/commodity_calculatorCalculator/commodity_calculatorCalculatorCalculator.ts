import { Calculator } from '../../engines/CalculatorEngine';
import { commodity_calculatorCalculatorInputs, commodity_calculatorCalculatorResults, commodity_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class commodity_calculatorCalculatorCalculator implements Calculator<commodity_calculatorCalculatorInputs, commodity_calculatorCalculatorResults> {
  readonly id = 'commodity_calculatorCalculator';
  readonly name = 'commodity_calculatorCalculator Calculator';
  readonly description = 'Calculate commodity_calculatorCalculator values';

  calculate(inputs: commodity_calculatorCalculatorInputs): commodity_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: commodity_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: commodity_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
