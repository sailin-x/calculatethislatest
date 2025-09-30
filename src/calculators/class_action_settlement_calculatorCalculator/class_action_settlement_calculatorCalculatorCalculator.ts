import { Calculator } from '../../engines/CalculatorEngine';
import { class_action_settlement_calculatorCalculatorInputs, class_action_settlement_calculatorCalculatorResults, class_action_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class class_action_settlement_calculatorCalculatorCalculator implements Calculator<class_action_settlement_calculatorCalculatorInputs, class_action_settlement_calculatorCalculatorResults> {
  readonly id = 'class_action_settlement_calculatorCalculator';
  readonly name = 'class_action_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate class_action_settlement_calculatorCalculator values';

  calculate(inputs: class_action_settlement_calculatorCalculatorInputs): class_action_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: class_action_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: class_action_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
