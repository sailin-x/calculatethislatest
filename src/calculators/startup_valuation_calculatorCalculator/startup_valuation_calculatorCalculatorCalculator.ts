import { Calculator } from '../../engines/CalculatorEngine';
import { startup_valuation_calculatorCalculatorInputs, startup_valuation_calculatorCalculatorResults, startup_valuation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class startup_valuation_calculatorCalculatorCalculator implements Calculator<startup_valuation_calculatorCalculatorInputs, startup_valuation_calculatorCalculatorResults> {
  readonly id = 'startup_valuation_calculatorCalculator';
  readonly name = 'startup_valuation_calculatorCalculator Calculator';
  readonly description = 'Calculate startup_valuation_calculatorCalculator values';

  calculate(inputs: startup_valuation_calculatorCalculatorInputs): startup_valuation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: startup_valuation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: startup_valuation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
