import { MortgageQualificationCalculator } from './MortgageQualificationCalculator';

export function registerMortgageQualificationCalculator() {
  // Calculator is registered through the main calculator registry
  return MortgageQualificationCalculator;
}

export default MortgageQualificationCalculator;