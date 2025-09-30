import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RequestForProposalScoringCalculator } from './RequestForProposalScoringCalculator';

export function registerRequestForProposalScoringCalculator(): void {
  calculatorRegistry.register(RequestForProposalScoringCalculator);
}

export { RequestForProposalScoringCalculator };
