import { Calculator } from '../../engines/CalculatorEngine';
import { life_settlement_value_calculatorCalculatorInputs, life_settlement_value_calculatorCalculatorResults, life_settlement_value_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class life_settlement_value_calculatorCalculatorCalculator implements Calculator<life_settlement_value_calculatorCalculatorInputs, life_settlement_value_calculatorCalculatorResults> {
  readonly id = 'life_settlement_value_calculatorCalculator';
  readonly name = 'life_settlement_value_calculatorCalculator Calculator';
  readonly description = 'Calculate life_settlement_value_calculatorCalculator values';

  calculate(inputs: life_settlement_value_calculatorCalculatorInputs): life_settlement_value_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: life_settlement_value_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: life_settlement_value_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
