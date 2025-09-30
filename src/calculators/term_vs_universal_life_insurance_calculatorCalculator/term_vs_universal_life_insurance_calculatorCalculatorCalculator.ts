import { Calculator } from '../../engines/CalculatorEngine';
import { term_vs_universal_life_insurance_calculatorCalculatorInputs, term_vs_universal_life_insurance_calculatorCalculatorResults, term_vs_universal_life_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class term_vs_universal_life_insurance_calculatorCalculatorCalculator implements Calculator<term_vs_universal_life_insurance_calculatorCalculatorInputs, term_vs_universal_life_insurance_calculatorCalculatorResults> {
  readonly id = 'term_vs_universal_life_insurance_calculatorCalculator';
  readonly name = 'term_vs_universal_life_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate term_vs_universal_life_insurance_calculatorCalculator values';

  calculate(inputs: term_vs_universal_life_insurance_calculatorCalculatorInputs): term_vs_universal_life_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: term_vs_universal_life_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: term_vs_universal_life_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
