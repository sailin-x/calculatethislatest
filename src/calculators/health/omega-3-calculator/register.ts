import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { Omega3Calculator } from './Omega3Calculator';

export function registerOmega3Calculator(): void {
  calculatorRegistry.register(Omega3Calculator);
}

export { Omega3Calculator };
