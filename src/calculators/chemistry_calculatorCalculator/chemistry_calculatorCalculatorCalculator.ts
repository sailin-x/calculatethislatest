import { Calculator } from '../../engines/CalculatorEngine';
import { chemistry_calculatorCalculatorInputs, chemistry_calculatorCalculatorResults, chemistry_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class chemistry_calculatorCalculatorCalculator implements Calculator<chemistry_calculatorCalculatorInputs, chemistry_calculatorCalculatorResults> {
  readonly id = 'chemistry_calculatorCalculator';
  readonly name = 'chemistry_calculatorCalculator Calculator';
  readonly description = 'Calculate chemistry_calculatorCalculator values';

  calculate(inputs: chemistry_calculatorCalculatorInputs): chemistry_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: chemistry_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: chemistry_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
