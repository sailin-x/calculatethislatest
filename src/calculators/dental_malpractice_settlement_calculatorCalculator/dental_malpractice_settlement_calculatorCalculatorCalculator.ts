import { Calculator } from '../../engines/CalculatorEngine';
import { dental_malpractice_settlement_calculatorCalculatorInputs, dental_malpractice_settlement_calculatorCalculatorResults, dental_malpractice_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class dental_malpractice_settlement_calculatorCalculatorCalculator implements Calculator<dental_malpractice_settlement_calculatorCalculatorInputs, dental_malpractice_settlement_calculatorCalculatorResults> {
  readonly id = 'dental_malpractice_settlement_calculatorCalculator';
  readonly name = 'dental_malpractice_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate dental_malpractice_settlement_calculatorCalculator values';

  calculate(inputs: dental_malpractice_settlement_calculatorCalculatorInputs): dental_malpractice_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: dental_malpractice_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: dental_malpractice_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
