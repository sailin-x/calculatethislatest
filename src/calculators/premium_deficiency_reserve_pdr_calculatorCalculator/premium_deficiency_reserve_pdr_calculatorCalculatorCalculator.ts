import { Calculator } from '../../engines/CalculatorEngine';
import { premium_deficiency_reserve_pdr_calculatorCalculatorInputs, premium_deficiency_reserve_pdr_calculatorCalculatorResults, premium_deficiency_reserve_pdr_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class premium_deficiency_reserve_pdr_calculatorCalculatorCalculator implements Calculator<premium_deficiency_reserve_pdr_calculatorCalculatorInputs, premium_deficiency_reserve_pdr_calculatorCalculatorResults> {
  readonly id = 'premium_deficiency_reserve_pdr_calculatorCalculator';
  readonly name = 'premium_deficiency_reserve_pdr_calculatorCalculator Calculator';
  readonly description = 'Calculate premium_deficiency_reserve_pdr_calculatorCalculator values';

  calculate(inputs: premium_deficiency_reserve_pdr_calculatorCalculatorInputs): premium_deficiency_reserve_pdr_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: premium_deficiency_reserve_pdr_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: premium_deficiency_reserve_pdr_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
