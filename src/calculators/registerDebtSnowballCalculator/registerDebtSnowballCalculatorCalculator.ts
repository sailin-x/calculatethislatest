import { Calculator } from '../../engines/CalculatorEngine';
import { registerDebtSnowballCalculatorInputs, registerDebtSnowballCalculatorResults, registerDebtSnowballCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerDebtSnowballCalculatorCalculator implements Calculator<registerDebtSnowballCalculatorInputs, registerDebtSnowballCalculatorResults> {
  readonly id = 'registerDebtSnowballCalculator';
  readonly name = 'registerDebtSnowballCalculator Calculator';
  readonly description = 'Calculate registerDebtSnowballCalculator values';

  calculate(inputs: registerDebtSnowballCalculatorInputs): registerDebtSnowballCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerDebtSnowballCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerDebtSnowballCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
