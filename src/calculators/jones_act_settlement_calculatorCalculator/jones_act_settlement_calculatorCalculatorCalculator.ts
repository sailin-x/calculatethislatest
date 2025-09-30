import { Calculator } from '../../engines/CalculatorEngine';
import { jones_act_settlement_calculatorCalculatorInputs, jones_act_settlement_calculatorCalculatorResults, jones_act_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class jones_act_settlement_calculatorCalculatorCalculator implements Calculator<jones_act_settlement_calculatorCalculatorInputs, jones_act_settlement_calculatorCalculatorResults> {
  readonly id = 'jones_act_settlement_calculatorCalculator';
  readonly name = 'jones_act_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate jones_act_settlement_calculatorCalculator values';

  calculate(inputs: jones_act_settlement_calculatorCalculatorInputs): jones_act_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: jones_act_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: jones_act_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
