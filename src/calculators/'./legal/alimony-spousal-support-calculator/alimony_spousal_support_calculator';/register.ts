import { calculatorRegistry } from '../../data/calculatorRegistry';
import { './legal/alimony-spousal-support-calculator/alimony_spousal_support_calculator';Calculator } from './'./legal/alimony-spousal-support-calculator/alimony_spousal_support_calculator';Calculator';

export function register'./legal/alimony-spousal-support-calculator/alimony_spousal_support_calculator';Calculator(): void {
  calculatorRegistry.register(new './legal/alimony-spousal-support-calculator/alimony_spousal_support_calculator';Calculator());
}
