import { Calculator } from '../../engines/CalculatorEngine';
import { options_valuation_calculatorCalculatorInputs, options_valuation_calculatorCalculatorResults, options_valuation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class options_valuation_calculatorCalculatorCalculator implements Calculator<options_valuation_calculatorCalculatorInputs, options_valuation_calculatorCalculatorResults> {
  readonly id = 'options_valuation_calculatorCalculator';
  readonly name = 'options_valuation_calculatorCalculator Calculator';
  readonly description = 'Calculate options_valuation_calculatorCalculator values';

  calculate(inputs: options_valuation_calculatorCalculatorInputs): options_valuation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: options_valuation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: options_valuation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
