import { Calculator } from '../../engines/CalculatorEngine';
import { DebtSnowballCalculatorInputs, DebtSnowballCalculatorResults, DebtSnowballCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class DebtSnowballCalculatorCalculator implements Calculator<DebtSnowballCalculatorInputs, DebtSnowballCalculatorResults> {
  readonly id = 'DebtSnowballCalculator';
  readonly name = 'DebtSnowballCalculator Calculator';
  readonly description = 'Calculate DebtSnowballCalculator values';

  calculate(inputs: DebtSnowballCalculatorInputs): DebtSnowballCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: DebtSnowballCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: DebtSnowballCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
