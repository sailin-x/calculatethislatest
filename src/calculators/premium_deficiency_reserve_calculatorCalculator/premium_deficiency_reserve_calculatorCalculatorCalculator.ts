import { Calculator } from '../../engines/CalculatorEngine';
import { premium_deficiency_reserve_calculatorCalculatorInputs, premium_deficiency_reserve_calculatorCalculatorResults, premium_deficiency_reserve_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class premium_deficiency_reserve_calculatorCalculatorCalculator implements Calculator<premium_deficiency_reserve_calculatorCalculatorInputs, premium_deficiency_reserve_calculatorCalculatorResults> {
  readonly id = 'premium_deficiency_reserve_calculatorCalculator';
  readonly name = 'premium_deficiency_reserve_calculatorCalculator Calculator';
  readonly description = 'Calculate premium_deficiency_reserve_calculatorCalculator values';

  calculate(inputs: premium_deficiency_reserve_calculatorCalculatorInputs): premium_deficiency_reserve_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: premium_deficiency_reserve_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: premium_deficiency_reserve_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
