import { Calculator } from '../../engines/CalculatorEngine';
import { divorce_settlement_calculatorCalculatorInputs, divorce_settlement_calculatorCalculatorResults, divorce_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class divorce_settlement_calculatorCalculatorCalculator implements Calculator<divorce_settlement_calculatorCalculatorInputs, divorce_settlement_calculatorCalculatorResults> {
  readonly id = 'divorce_settlement_calculatorCalculator';
  readonly name = 'divorce_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate divorce_settlement_calculatorCalculator values';

  calculate(inputs: divorce_settlement_calculatorCalculatorInputs): divorce_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: divorce_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: divorce_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
