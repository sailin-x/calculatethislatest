import { Calculator } from '../../engines/CalculatorEngine';
import { talcum_powder_settlement_calculatorCalculatorInputs, talcum_powder_settlement_calculatorCalculatorResults, talcum_powder_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class talcum_powder_settlement_calculatorCalculatorCalculator implements Calculator<talcum_powder_settlement_calculatorCalculatorInputs, talcum_powder_settlement_calculatorCalculatorResults> {
  readonly id = 'talcum_powder_settlement_calculatorCalculator';
  readonly name = 'talcum_powder_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate talcum_powder_settlement_calculatorCalculator values';

  calculate(inputs: talcum_powder_settlement_calculatorCalculatorInputs): talcum_powder_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: talcum_powder_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: talcum_powder_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
