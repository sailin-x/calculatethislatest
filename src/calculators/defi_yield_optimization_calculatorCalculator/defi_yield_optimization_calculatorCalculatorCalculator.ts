import { Calculator } from '../../engines/CalculatorEngine';
import { defi_yield_optimization_calculatorCalculatorInputs, defi_yield_optimization_calculatorCalculatorResults, defi_yield_optimization_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class defi_yield_optimization_calculatorCalculatorCalculator implements Calculator<defi_yield_optimization_calculatorCalculatorInputs, defi_yield_optimization_calculatorCalculatorResults> {
  readonly id = 'defi_yield_optimization_calculatorCalculator';
  readonly name = 'defi_yield_optimization_calculatorCalculator Calculator';
  readonly description = 'Calculate defi_yield_optimization_calculatorCalculator values';

  calculate(inputs: defi_yield_optimization_calculatorCalculatorInputs): defi_yield_optimization_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: defi_yield_optimization_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: defi_yield_optimization_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
