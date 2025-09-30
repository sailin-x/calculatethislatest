import { Calculator } from '../../engines/CalculatorEngine';
import { product_liability_settlement_calculatorCalculatorInputs, product_liability_settlement_calculatorCalculatorResults, product_liability_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class product_liability_settlement_calculatorCalculatorCalculator implements Calculator<product_liability_settlement_calculatorCalculatorInputs, product_liability_settlement_calculatorCalculatorResults> {
  readonly id = 'product_liability_settlement_calculatorCalculator';
  readonly name = 'product_liability_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate product_liability_settlement_calculatorCalculator values';

  calculate(inputs: product_liability_settlement_calculatorCalculatorInputs): product_liability_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: product_liability_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: product_liability_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
