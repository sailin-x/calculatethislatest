import { Calculator } from '../../engines/CalculatorEngine';
import { felasettlementcalculatorrailroadCalculatorInputs, felasettlementcalculatorrailroadCalculatorOutputs } from './types';
import { calculatefelasettlementcalculatorrailroadCalculatorResults } from './formulas';
import { validatefelasettlementcalculatorrailroadCalculatorInputs } from './validation';

export class felasettlementcalculatorrailroadCalculator implements Calculator<
  felasettlementcalculatorrailroadCalculatorInputs,
  felasettlementcalculatorrailroadCalculatorOutputs
> {
  readonly id = 'fela_settlement_calculator_railroad_calculator';
  readonly name = 'fela settlement calculator railroad Calculator';
  readonly description = 'Professional fela settlement calculator railroad calculator with domain-specific functionality';

  calculate(inputs: felasettlementcalculatorrailroadCalculatorInputs): felasettlementcalculatorrailroadCalculatorOutputs {
    const validation = validatefelasettlementcalculatorrailroadCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatefelasettlementcalculatorrailroadCalculatorResults(inputs);
  }

  validateInputs(inputs: felasettlementcalculatorrailroadCalculatorInputs): boolean {
    const validation = validatefelasettlementcalculatorrailroadCalculatorInputs(inputs);
    return validation.isValid;
  }
}
