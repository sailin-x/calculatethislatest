import { Calculator } from '../../engines/CalculatorEngine';
import { registerDebtConsolidationCalculatorInputs, registerDebtConsolidationCalculatorResults, registerDebtConsolidationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerDebtConsolidationCalculatorCalculator implements Calculator<registerDebtConsolidationCalculatorInputs, registerDebtConsolidationCalculatorResults> {
  readonly id = 'registerDebtConsolidationCalculator';
  readonly name = 'registerDebtConsolidationCalculator Calculator';
  readonly description = 'Calculate registerDebtConsolidationCalculator values';

  calculate(inputs: registerDebtConsolidationCalculatorInputs): registerDebtConsolidationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerDebtConsolidationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerDebtConsolidationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
