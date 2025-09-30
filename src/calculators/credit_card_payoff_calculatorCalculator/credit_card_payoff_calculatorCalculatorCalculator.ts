import { Calculator } from '../../engines/CalculatorEngine';
import { credit_card_payoff_calculatorCalculatorInputs, credit_card_payoff_calculatorCalculatorResults, credit_card_payoff_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class credit_card_payoff_calculatorCalculatorCalculator implements Calculator<credit_card_payoff_calculatorCalculatorInputs, credit_card_payoff_calculatorCalculatorResults> {
  readonly id = 'credit_card_payoff_calculatorCalculator';
  readonly name = 'credit_card_payoff_calculatorCalculator Calculator';
  readonly description = 'Calculate credit_card_payoff_calculatorCalculator values';

  calculate(inputs: credit_card_payoff_calculatorCalculatorInputs): credit_card_payoff_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: credit_card_payoff_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: credit_card_payoff_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
