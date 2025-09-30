import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { IntellectualPropertyLicensingCalculator } from './IntellectualPropertyLicensingCalculator';

export function registerIntellectualPropertyLicensingCalculator(): void {
  calculatorRegistry.register(IntellectualPropertyLicensingCalculator);
}

export { IntellectualPropertyLicensingCalculator };
