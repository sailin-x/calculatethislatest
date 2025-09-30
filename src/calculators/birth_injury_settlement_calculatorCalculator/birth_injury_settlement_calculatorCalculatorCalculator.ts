import { Calculator } from '../../engines/CalculatorEngine';
import { birth_injury_settlement_calculatorCalculatorInputs, birth_injury_settlement_calculatorCalculatorResults, birth_injury_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class birth_injury_settlement_calculatorCalculatorCalculator implements Calculator<birth_injury_settlement_calculatorCalculatorInputs, birth_injury_settlement_calculatorCalculatorResults> {
  readonly id = 'birth_injury_settlement_calculatorCalculator';
  readonly name = 'birth_injury_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate birth_injury_settlement_calculatorCalculator values';

  calculate(inputs: birth_injury_settlement_calculatorCalculatorInputs): birth_injury_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: birth_injury_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: birth_injury_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
