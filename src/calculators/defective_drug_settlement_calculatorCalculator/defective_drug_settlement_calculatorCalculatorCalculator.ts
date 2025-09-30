import { Calculator } from '../../engines/CalculatorEngine';
import { defective_drug_settlement_calculatorCalculatorInputs, defective_drug_settlement_calculatorCalculatorResults, defective_drug_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class defective_drug_settlement_calculatorCalculatorCalculator implements Calculator<defective_drug_settlement_calculatorCalculatorInputs, defective_drug_settlement_calculatorCalculatorResults> {
  readonly id = 'defective_drug_settlement_calculatorCalculator';
  readonly name = 'defective_drug_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate defective_drug_settlement_calculatorCalculator values';

  calculate(inputs: defective_drug_settlement_calculatorCalculatorInputs): defective_drug_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: defective_drug_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: defective_drug_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
