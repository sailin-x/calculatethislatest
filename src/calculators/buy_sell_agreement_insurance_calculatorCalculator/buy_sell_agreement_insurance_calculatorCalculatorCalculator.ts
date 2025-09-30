import { Calculator } from '../../engines/CalculatorEngine';
import { buy_sell_agreement_insurance_calculatorCalculatorInputs, buy_sell_agreement_insurance_calculatorCalculatorResults, buy_sell_agreement_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class buy_sell_agreement_insurance_calculatorCalculatorCalculator implements Calculator<buy_sell_agreement_insurance_calculatorCalculatorInputs, buy_sell_agreement_insurance_calculatorCalculatorResults> {
  readonly id = 'buy_sell_agreement_insurance_calculatorCalculator';
  readonly name = 'buy_sell_agreement_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate buy_sell_agreement_insurance_calculatorCalculator values';

  calculate(inputs: buy_sell_agreement_insurance_calculatorCalculatorInputs): buy_sell_agreement_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: buy_sell_agreement_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: buy_sell_agreement_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
