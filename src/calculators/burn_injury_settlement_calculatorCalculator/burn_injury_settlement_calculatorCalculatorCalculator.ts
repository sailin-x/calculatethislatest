import { Calculator } from '../../engines/CalculatorEngine';
import { burn_injury_settlement_calculatorCalculatorInputs, burn_injury_settlement_calculatorCalculatorResults, burn_injury_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class burn_injury_settlement_calculatorCalculatorCalculator implements Calculator<burn_injury_settlement_calculatorCalculatorInputs, burn_injury_settlement_calculatorCalculatorResults> {
  readonly id = 'burn_injury_settlement_calculatorCalculator';
  readonly name = 'burn_injury_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate burn_injury_settlement_calculatorCalculator values';

  calculate(inputs: burn_injury_settlement_calculatorCalculatorInputs): burn_injury_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: burn_injury_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: burn_injury_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
