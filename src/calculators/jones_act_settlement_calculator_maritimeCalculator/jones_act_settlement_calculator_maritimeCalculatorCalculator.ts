import { Calculator } from '../../engines/CalculatorEngine';
import { jones_act_settlement_calculator_maritimeCalculatorInputs, jones_act_settlement_calculator_maritimeCalculatorResults, jones_act_settlement_calculator_maritimeCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class jones_act_settlement_calculator_maritimeCalculatorCalculator implements Calculator<jones_act_settlement_calculator_maritimeCalculatorInputs, jones_act_settlement_calculator_maritimeCalculatorResults> {
  readonly id = 'jones_act_settlement_calculator_maritimeCalculator';
  readonly name = 'jones_act_settlement_calculator_maritimeCalculator Calculator';
  readonly description = 'Calculate jones_act_settlement_calculator_maritimeCalculator values';

  calculate(inputs: jones_act_settlement_calculator_maritimeCalculatorInputs): jones_act_settlement_calculator_maritimeCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: jones_act_settlement_calculator_maritimeCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: jones_act_settlement_calculator_maritimeCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
