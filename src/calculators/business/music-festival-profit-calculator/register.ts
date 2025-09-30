import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MusicFestivalProfitCalculator } from './MusicFestivalProfitCalculator';

export function registerMusicFestivalProfitCalculator(): void {
  calculatorRegistry.register(MusicFestivalProfitCalculator);
}

export { MusicFestivalProfitCalculator };
