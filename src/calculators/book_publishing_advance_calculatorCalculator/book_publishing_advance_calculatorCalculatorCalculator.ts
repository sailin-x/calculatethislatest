import { Calculator } from '../../engines/CalculatorEngine';
import { book_publishing_advance_calculatorCalculatorInputs, book_publishing_advance_calculatorCalculatorResults, book_publishing_advance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class book_publishing_advance_calculatorCalculatorCalculator implements Calculator<book_publishing_advance_calculatorCalculatorInputs, book_publishing_advance_calculatorCalculatorResults> {
  readonly id = 'book_publishing_advance_calculatorCalculator';
  readonly name = 'book_publishing_advance_calculatorCalculator Calculator';
  readonly description = 'Calculate book_publishing_advance_calculatorCalculator values';

  calculate(inputs: book_publishing_advance_calculatorCalculatorInputs): book_publishing_advance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: book_publishing_advance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: book_publishing_advance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
