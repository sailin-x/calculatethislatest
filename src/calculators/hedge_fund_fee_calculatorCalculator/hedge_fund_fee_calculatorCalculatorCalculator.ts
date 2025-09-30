import { Calculator } from '../../engines/CalculatorEngine';
import { hedge_fund_fee_calculatorCalculatorInputs, hedge_fund_fee_calculatorCalculatorResults, hedge_fund_fee_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hedge_fund_fee_calculatorCalculatorCalculator implements Calculator<hedge_fund_fee_calculatorCalculatorInputs, hedge_fund_fee_calculatorCalculatorResults> {
  readonly id = 'hedge_fund_fee_calculatorCalculator';
  readonly name = 'hedge_fund_fee_calculatorCalculator Calculator';
  readonly description = 'Calculate hedge_fund_fee_calculatorCalculator values';

  calculate(inputs: hedge_fund_fee_calculatorCalculatorInputs): hedge_fund_fee_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hedge_fund_fee_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hedge_fund_fee_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
