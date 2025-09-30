import { Calculator } from '../../engines/CalculatorEngine';
import { paint_calculatorCalculatorInputs, paint_calculatorCalculatorResults, paint_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class paint_calculatorCalculatorCalculator implements Calculator<paint_calculatorCalculatorInputs, paint_calculatorCalculatorResults> {
  readonly id = 'paint_calculatorCalculator';
  readonly name = 'paint_calculatorCalculator Calculator';
  readonly description = 'Calculate paint_calculatorCalculator values';

  calculate(inputs: paint_calculatorCalculatorInputs): paint_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: paint_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: paint_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
