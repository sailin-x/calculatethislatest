import { Calculator } from '../../engines/CalculatorEngine';
import { government_contract_bid_calculatorCalculatorInputs, government_contract_bid_calculatorCalculatorResults, government_contract_bid_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class government_contract_bid_calculatorCalculatorCalculator implements Calculator<government_contract_bid_calculatorCalculatorInputs, government_contract_bid_calculatorCalculatorResults> {
  readonly id = 'government_contract_bid_calculatorCalculator';
  readonly name = 'government_contract_bid_calculatorCalculator Calculator';
  readonly description = 'Calculate government_contract_bid_calculatorCalculator values';

  calculate(inputs: government_contract_bid_calculatorCalculatorInputs): government_contract_bid_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: government_contract_bid_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: government_contract_bid_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
