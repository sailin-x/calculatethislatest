import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MusicFestivalProfitLossCalculator } from './MusicFestivalProfitLossCalculator';

export function registerMusicFestivalProfitLossCalculator(): void {
  calculatorRegistry.register(MusicFestivalProfitLossCalculator);
}

export { MusicFestivalProfitLossCalculator };
