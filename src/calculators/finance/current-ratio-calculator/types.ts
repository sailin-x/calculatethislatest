export interface CurrentRatioCalculatorInputs {
    currentAssets: number;
    currentLiabilities: number;
}

export interface CurrentRatioCalculatorOutputs {
    currentRatio: number;
    liquidityRating: string;
    explanation: string;
}