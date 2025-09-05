import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PrivateMortgageInsuranceCalculator } from './PrivateMortgageInsuranceCalculator';

export const privateMortgageInsuranceCalculator = new PrivateMortgageInsuranceCalculator();

calculatorRegistry.register(privateMortgageInsuranceCalculator);