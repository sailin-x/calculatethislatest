import { Calculator } from '../../engines/CalculatorEngine';
import { chapter11bankruptcyplanvaluationCalculatorInputs, chapter11bankruptcyplanvaluationCalculatorOutputs } from './types';
import { calculatechapter11bankruptcyplanvaluationCalculatorResults } from './formulas';
import { validatechapter11bankruptcyplanvaluationCalculatorInputs } from './validation';

export class chapter11bankruptcyplanvaluationCalculator implements Calculator<
  chapter11bankruptcyplanvaluationCalculatorInputs,
  chapter11bankruptcyplanvaluationCalculatorOutputs
> {
  readonly id = 'chapter_11_bankruptcy_plan_valuation_calculator';
  readonly name = 'chapter 11 bankruptcy plan valuation Calculator';
  readonly description = 'Professional chapter 11 bankruptcy plan valuation calculator with domain-specific functionality';

  calculate(inputs: chapter11bankruptcyplanvaluationCalculatorInputs): chapter11bankruptcyplanvaluationCalculatorOutputs {
    const validation = validatechapter11bankruptcyplanvaluationCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatechapter11bankruptcyplanvaluationCalculatorResults(inputs);
  }

  validateInputs(inputs: chapter11bankruptcyplanvaluationCalculatorInputs): boolean {
    const validation = validatechapter11bankruptcyplanvaluationCalculatorInputs(inputs);
    return validation.isValid;
  }
}
