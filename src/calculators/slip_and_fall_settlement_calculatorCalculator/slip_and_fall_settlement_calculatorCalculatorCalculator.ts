import { Calculator } from '../../engines/CalculatorEngine';
import { slip_and_fall_settlement_calculatorCalculatorInputs, slip_and_fall_settlement_calculatorCalculatorResults, slip_and_fall_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class slip_and_fall_settlement_calculatorCalculatorCalculator implements Calculator<slip_and_fall_settlement_calculatorCalculatorInputs, slip_and_fall_settlement_calculatorCalculatorResults> {
  readonly id = 'slip_and_fall_settlement_calculatorCalculator';
  readonly name = 'slip_and_fall_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate slip_and_fall_settlement_calculatorCalculator values';

  calculate(inputs: slip_and_fall_settlement_calculatorCalculatorInputs): slip_and_fall_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: slip_and_fall_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: slip_and_fall_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
