import { Calculator } from '../../engines/CalculatorEngine';
import { fela_settlement_calculator_railroadCalculatorInputs, fela_settlement_calculator_railroadCalculatorResults, fela_settlement_calculator_railroadCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fela_settlement_calculator_railroadCalculatorCalculator implements Calculator<fela_settlement_calculator_railroadCalculatorInputs, fela_settlement_calculator_railroadCalculatorResults> {
  readonly id = 'fela_settlement_calculator_railroadCalculator';
  readonly name = 'fela_settlement_calculator_railroadCalculator Calculator';
  readonly description = 'Calculate fela_settlement_calculator_railroadCalculator values';

  calculate(inputs: fela_settlement_calculator_railroadCalculatorInputs): fela_settlement_calculator_railroadCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fela_settlement_calculator_railroadCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fela_settlement_calculator_railroadCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
