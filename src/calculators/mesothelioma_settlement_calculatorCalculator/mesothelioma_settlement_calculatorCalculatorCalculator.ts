import { Calculator } from '../../engines/CalculatorEngine';
import { mesothelioma_settlement_calculatorCalculatorInputs, mesothelioma_settlement_calculatorCalculatorResults, mesothelioma_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mesothelioma_settlement_calculatorCalculatorCalculator implements Calculator<mesothelioma_settlement_calculatorCalculatorInputs, mesothelioma_settlement_calculatorCalculatorResults> {
  readonly id = 'mesothelioma_settlement_calculatorCalculator';
  readonly name = 'mesothelioma_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate mesothelioma_settlement_calculatorCalculator values';

  calculate(inputs: mesothelioma_settlement_calculatorCalculatorInputs): mesothelioma_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mesothelioma_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mesothelioma_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
