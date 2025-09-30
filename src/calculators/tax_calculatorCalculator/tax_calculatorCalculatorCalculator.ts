import { Calculator } from '../../engines/CalculatorEngine';
import { tax_calculatorCalculatorInputs, tax_calculatorCalculatorResults, tax_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class tax_calculatorCalculatorCalculator implements Calculator<tax_calculatorCalculatorInputs, tax_calculatorCalculatorResults> {
  readonly id = 'tax_calculatorCalculator';
  readonly name = 'tax_calculatorCalculator Calculator';
  readonly description = 'Calculate tax_calculatorCalculator values';

  calculate(inputs: tax_calculatorCalculatorInputs): tax_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: tax_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: tax_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
