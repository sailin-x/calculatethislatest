import { Calculator } from '../../engines/CalculatorEngine';
import { peer_to_peer_lending_calculatorCalculatorInputs, peer_to_peer_lending_calculatorCalculatorResults, peer_to_peer_lending_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class peer_to_peer_lending_calculatorCalculatorCalculator implements Calculator<peer_to_peer_lending_calculatorCalculatorInputs, peer_to_peer_lending_calculatorCalculatorResults> {
  readonly id = 'peer_to_peer_lending_calculatorCalculator';
  readonly name = 'peer_to_peer_lending_calculatorCalculator Calculator';
  readonly description = 'Calculate peer_to_peer_lending_calculatorCalculator values';

  calculate(inputs: peer_to_peer_lending_calculatorCalculatorInputs): peer_to_peer_lending_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: peer_to_peer_lending_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: peer_to_peer_lending_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
