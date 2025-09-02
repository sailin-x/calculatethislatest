import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ForexTradingCalculatorInputs, ForexTradingCalculatorOutputs } from './types';
import { calculateForexTrading } from './formulas';
import { validateForexTradingCalculatorInputs } from './validation';
import { validateField } from './quickValidation';

export default function ForexTradingCalculator() {
  const [inputs, setInputs] = useState<ForexTradingCalculatorInputs>({
    forexInfo: {
      basicInfo: {
        baseCurrency: 'USD',
        quoteCurrency: 'EUR',
        currencyPair: 'EUR/USD',
        exchangeRate: 1.0850,
        bidPrice: 1.0848,
        askPrice: 1.0852,
        spread: 0.0004,
        pipValue: 10,
        lotSize: 100000,
        marginRequirement: 0.02,
        leverage: 50,
        swapRate: 0.0001,
        rolloverRate: 0.0001
      },
      currencyPairs: [],
      currencyInfo: [],
      exchangeRateData: []
    },
    positionInfo: {
      currentPositions: [],
      positionSummary: {
        totalPositions: 0,
        longPositions: 0,
        shortPositions: 0,
        totalLotSize: 0,
        totalUnrealizedPnL: 0,
        totalRealizedPnL: 0,
        totalPnL: 0,
        totalMargin: 0,
        totalMarginRequirement: 0,
        totalMarginUtilization: 0,
        averageLeverage: 0,
        totalSwap: 0,
        totalRollover: 0,
        netExposure: 0,
        currencyExposure: []
      },
      positionAnalysis: {
        currencyExposure: [],
        correlationAnalysis: [],
        riskConcentration: []
      }
    },
    strategyInfo: {
      strategyType: {
        directional: 'trend_following',
        carry: 'interest_rate_carry',
        arbitrage: 'triangular_arbitrage',
        hedging: 'currency_hedge',
        scalping: 'high_frequency',
        custom: ''
      },
      strategyParameters: {
        strategy: '',
        description: '',
        maxProfit: 0,
        maxLoss: 0,
        breakevenPoints: [],
        probabilityOfProfit: 0,
        holdingPeriod: 0,
        expectedMove: 0,
        riskRewardRatio: 0,
        marginRequirement: 0,
        leverage: 0,
        stopLoss: 0,
        takeProfit: 0,
        trailingStop: 0
      },
      strategyLegs: [],
      strategyAnalysis: {
        profitLoss: [],
        riskMetrics: {
          maxProfit: 0,
          maxLoss: 0,
          breakevenPoints: [],
          probabilityOfProfit: 0,
          expectedValue: 0,
          standardDeviation: 0,
          var: 0,
          cvar: 0
        },
        currencyExposure: [],
        correlationImpact: []
      }
    },
    marketData: {
      historicalData: [],
      economicData: [],
      centralBankData: [],
      marketConditions: {
        marketTrend: 'sideways',
        volatilityRegime: 'normal',
        liquidityRegime: 'high',
        marketSentiment: 'neutral',
        riskAppetite: 'medium',
        safeHavenDemand: 'medium',
        carryTradeDemand: 'medium',
        volatilityIndex: 0,
        fearGreedIndex: 0
      },
      technicalIndicators: []
    },
    riskManagement: {
      riskMetrics: {
        positionSize: 0,
        riskPerTrade: 0,
        maxDrawdown: 0,
        sharpeRatio: 0,
        sortinoRatio: 0,
        calmarRatio: 0,
        var: 0,
        cvar: 0,
        expectedShortfall: 0,
        stressTestResults: []
      },
      riskLimits: {
        maxPositionSize: 0,
        maxLeverage: 0,
        maxDrawdown: 0,
        maxDailyLoss: 0,
        maxWeeklyLoss: 0,
        maxMonthlyLoss: 0,
        correlationLimit: 0,
        concentrationLimit: 0
      },
      riskMonitoring: {
        alerts: [],
        reports: [],
        dashboards: []
      }
    },
    performance: {
      performanceMetrics: {
        totalReturn: 0,
        annualizedReturn: 0,
        volatility: 0,
        sharpeRatio: 0,
        sortinoRatio: 0,
        calmarRatio: 0,
        maxDrawdown: 0,
        winRate: 0,
        profitFactor: 0,
        averageWin: 0,
        averageLoss: 0,
        largestWin: 0,
        largestLoss: 0,
        consecutiveWins: 0,
        consecutiveLosses: 0
      },
      performanceAnalysis: {
        monthlyReturns: [],
        quarterlyReturns: [],
        yearlyReturns: [],
        rollingReturns: [],
        rollingVolatility: [],
        rollingSharpe: [],
        rollingDrawdown: []
      },
      attribution: {
        currencyAttribution: [],
        strategyAttribution: [],
        timingAttribution: [],
        selectionAttribution: []
      }
    },
    analysis: {
      fundamentalAnalysis: {
        interestRateDifferential: 0,
        inflationDifferential: 0,
        gdpDifferential: 0,
        tradeBalanceImpact: 0,
        currentAccountImpact: 0,
        politicalRisk: 0,
        economicRisk: 0,
        sovereignRisk: 0,
        creditRisk: 0,
        liquidityRisk: 0
      },
      technicalAnalysis: {
        trendAnalysis: {
          shortTerm: 'neutral',
          mediumTerm: 'neutral',
          longTerm: 'neutral',
          strength: 0
        },
        supportResistance: {
          support: [],
          resistance: [],
          pivotPoints: []
        },
        momentumIndicators: {
          rsi: 0,
          macd: 0,
          stochastics: 0,
          williamsR: 0,
          cci: 0
        },
        volatilityIndicators: {
          bollingerBands: {
            upper: 0,
            middle: 0,
            lower: 0,
            width: 0,
            position: 0
          },
          atr: 0,
          keltnerChannels: {
            upper: 0,
            middle: 0,
            lower: 0
          }
        },
        volumeIndicators: {
          volume: 0,
          obv: 0,
          vwap: 0,
          moneyFlow: 0
        }
      },
      sentimentAnalysis: {
        marketSentiment: 'neutral',
        newsSentiment: 'neutral',
        socialSentiment: 'neutral',
        institutionalSentiment: 'neutral',
        retailSentiment: 'neutral',
        overallSentiment: 'neutral',
        sentimentScore: 0
      }
    },
    optimization: {
      optimizationParameters: {
        objective: 'maximize_return' | 'minimize_risk' | 'maximize_sharpe' | 'custom',
        constraints: {
          maxLeverage: 0,
          maxDrawdown: 0,
          maxPositionSize: 0,
          correlationLimit: 0,
          concentrationLimit: 0
        },
        timeHorizon: 0,
        confidenceLevel: 0,
        riskFreeRate: 0
      },
      optimizationResults: {
        optimalWeights: [],
        expectedReturn: 0,
        expectedRisk: 0,
        sharpeRatio: 0,
        efficientFrontier: [],
        riskContribution: [],
        rebalancingSchedule: []
      },
      scenarioAnalysis: {
        scenarios: [],
        stressTests: [],
        sensitivityAnalysis: []
      }
    },
    efficiency: {
      efficiencyMetrics: {
        executionEfficiency: 0,
        slippage: 0,
        spreadCost: 0,
        commissionCost: 0,
        swapCost: 0,
        totalCost: 0,
        costPerPip: 0,
        efficiencyRatio: 0
      },
      efficiencyAnalysis: {
        costBreakdown: [],
        efficiencyTrends: [],
        comparisonEfficiency: 0
      }
    },
    forexTradingScore: {
      overallScore: 0,
      componentScores: {
        position: 0,
        strategy: 0,
        risk: 0,
        fundamental: 0,
        technical: 0,
        trading: 0
      },
      recommendation: 'needs_improvement'
    },
    monteCarloResults: {
      meanReturn: 0,
      medianReturn: 0,
      standardDeviation: 0,
      percentiles: {
        p5: 0,
        p10: 0,
        p25: 0,
        p50: 0,
        p75: 0,
        p90: 0,
        p95: 0
      },
      probabilityDistribution: [],
      successProbability: 0
    },
    historicalAnalysis: {
      historicalRate: 0,
      historicalReturn: 0,
      historicalVolatility: 0,
      historicalTrends: [],
      yearOverYearChange: 0
    },
    businessImpact: {
      returnEnhancement: 0,
      riskReduction: 0,
      costSavings: 0,
      efficiencyGain: 0,
      overallBenefit: 0
    },
    comprehensiveReport: {
      executiveSummary: '',
      keyFindings: [],
      forexAssessment: '',
      recommendations: [],
      actionItems: []
    },
    executiveSummary: {
      exchangeRate: 0,
      pipValue: 0,
      marginUtilization: 0,
      leverage: 0,
      swap: 0,
      rollover: 0,
      recommendation: 'needs_improvement',
      keyStrengths: [],
      keyWeaknesses: []
    },
    recommendations: [],
    actionItems: []
  });

  const [results, setResults] = useState<ForexTradingCalculatorOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = validateForexTradingCalculatorInputs(inputs);
    if (validation.isValid) {
      try {
        const calculatedResults = calculateForexTrading(inputs);
        setResults(calculatedResults);
        setErrors({});
      } catch (error) {
        setErrors({ calculation: 'Error calculating forex trading' });
      }
    } else {
      setErrors(validation.errors || {});
    }
  }, [inputs]);

  const handleInputChange = (field: string, value: any) => {
    const fieldPath = field.split('.');
    setInputs(prev => {
      const newInputs = { ...prev };
      let current: any = newInputs;
      
      for (let i = 0; i < fieldPath.length - 1; i++) {
        current = current[fieldPath[i]];
      }
      
      current[fieldPath[fieldPath.length - 1]] = value;
      
      // Perform quick validation
      const validation = validateField(field, value, newInputs);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, [field]: validation.error || '' }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
      
      if (validation.warning) {
        setWarnings(prev => ({ ...prev, [field]: validation.warning || '' }));
      } else {
        setWarnings(prev => {
          const newWarnings = { ...prev };
          delete newWarnings[field];
          return newWarnings;
        });
      }
      
      return newInputs;
    });
  };

  const formatCurrency = (value: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const formatPips = (value: number) => {
    return `${value.toFixed(1)} pips`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Forex Trading Calculator</h1>
        <p className="text-muted-foreground">
          Comprehensive forex trading analysis and strategy optimization tool
        </p>
      </div>

      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            Please fix the following errors:
            <ul className="mt-2 list-disc list-inside">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {Object.keys(warnings).length > 0 && (
        <Alert>
          <AlertDescription>
            Warnings:
            <ul className="mt-2 list-disc list-inside">
              {Object.entries(warnings).map(([field, warning]) => (
                <li key={field}>{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="market">Market Data</TabsTrigger>
          <TabsTrigger value="risk">Risk Management</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Currency Pair Information</CardTitle>
              <CardDescription>Enter basic forex trading information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="baseCurrency">Base Currency</Label>
                  <Select
                    value={inputs.forexInfo.basicInfo.baseCurrency}
                    onValueChange={(value) => {
                      handleInputChange('forexInfo.basicInfo.baseCurrency', value);
                      handleInputChange('forexInfo.basicInfo.currencyPair', `${value}/${inputs.forexInfo.basicInfo.quoteCurrency}`);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select base currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                      <SelectItem value="AUD">AUD</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                      <SelectItem value="CHF">CHF</SelectItem>
                      <SelectItem value="NZD">NZD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quoteCurrency">Quote Currency</Label>
                  <Select
                    value={inputs.forexInfo.basicInfo.quoteCurrency}
                    onValueChange={(value) => {
                      handleInputChange('forexInfo.basicInfo.quoteCurrency', value);
                      handleInputChange('forexInfo.basicInfo.currencyPair', `${inputs.forexInfo.basicInfo.baseCurrency}/${value}`);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select quote currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                      <SelectItem value="AUD">AUD</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                      <SelectItem value="CHF">CHF</SelectItem>
                      <SelectItem value="NZD">NZD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exchangeRate">Exchange Rate</Label>
                  <Input
                    id="exchangeRate"
                    type="number"
                    step="0.0001"
                    value={inputs.forexInfo.basicInfo.exchangeRate}
                    onChange={(e) => handleInputChange('forexInfo.basicInfo.exchangeRate', parseFloat(e.target.value) || 0)}
                    placeholder="Enter exchange rate"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bidPrice">Bid Price</Label>
                  <Input
                    id="bidPrice"
                    type="number"
                    step="0.0001"
                    value={inputs.forexInfo.basicInfo.bidPrice}
                    onChange={(e) => handleInputChange('forexInfo.basicInfo.bidPrice', parseFloat(e.target.value) || 0)}
                    placeholder="Enter bid price"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="askPrice">Ask Price</Label>
                  <Input
                    id="askPrice"
                    type="number"
                    step="0.0004"
                    value={inputs.forexInfo.basicInfo.askPrice}
                    onChange={(e) => handleInputChange('forexInfo.basicInfo.askPrice', parseFloat(e.target.value) || 0)}
                    placeholder="Enter ask price"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="leverage">Leverage</Label>
                  <Input
                    id="leverage"
                    type="number"
                    value={inputs.forexInfo.basicInfo.leverage}
                    onChange={(e) => handleInputChange('forexInfo.basicInfo.leverage', parseInt(e.target.value) || 0)}
                    placeholder="Enter leverage"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lotSize">Lot Size</Label>
                  <Input
                    id="lotSize"
                    type="number"
                    value={inputs.forexInfo.basicInfo.lotSize}
                    onChange={(e) => handleInputChange('forexInfo.basicInfo.lotSize', parseInt(e.target.value) || 0)}
                    placeholder="Enter lot size"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pipValue">Pip Value</Label>
                  <Input
                    id="pipValue"
                    type="number"
                    value={inputs.forexInfo.basicInfo.pipValue}
                    onChange={(e) => handleInputChange('forexInfo.basicInfo.pipValue', parseFloat(e.target.value) || 0)}
                    placeholder="Enter pip value"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Position Information</CardTitle>
              <CardDescription>Add and manage forex positions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="positionPair">Currency Pair</Label>
                  <Input
                    id="positionPair"
                    placeholder="e.g., EUR/USD"
                    onChange={(e) => {
                      const pair = e.target.value;
                      if (pair && inputs.positionInfo.currentPositions.length === 0) {
                        const newPosition = {
                          pair,
                          side: 'long' as const,
                          lotSize: 100000,
                          entryPrice: 1.0850,
                          currentPrice: 1.0850,
                          entryDate: new Date().toISOString().split('T')[0],
                          unrealizedPnL: 0,
                          realizedPnL: 0,
                          totalPnL: 0,
                          margin: 2000,
                          marginRequirement: 0.02,
                          marginUtilization: 0.5,
                          leverage: 50,
                          swap: 0,
                          rollover: 0,
                          pipValue: 10,
                          pipPnL: 0
                        };
                        handleInputChange('positionInfo.currentPositions', [newPosition]);
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="positionSide">Position Side</Label>
                  <Select
                    onValueChange={(value) => {
                      if (inputs.positionInfo.currentPositions.length > 0) {
                        const updated = [...inputs.positionInfo.currentPositions];
                        updated[0] = {
                          ...updated[0],
                          side: value as 'long' | 'short'
                        };
                        handleInputChange('positionInfo.currentPositions', updated);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position side" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="long">Long</SelectItem>
                      <SelectItem value="short">Short</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lotSize">Lot Size</Label>
                  <Input
                    id="lotSize"
                    type="number"
                    placeholder="Enter lot size"
                    onChange={(e) => {
                      const lotSize = parseInt(e.target.value) || 0;
                      if (inputs.positionInfo.currentPositions.length > 0) {
                        const updated = [...inputs.positionInfo.currentPositions];
                        updated[0] = {
                          ...updated[0],
                          lotSize
                        };
                        handleInputChange('positionInfo.currentPositions', updated);
                      }
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Configuration</CardTitle>
              <CardDescription>Configure trading strategy parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="strategyType">Strategy Type</Label>
                  <Select
                    value={inputs.strategyInfo.strategyType.directional}
                    onValueChange={(value) => handleInputChange('strategyInfo.strategyType.directional', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select strategy type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trend_following">Trend Following</SelectItem>
                      <SelectItem value="mean_reversion">Mean Reversion</SelectItem>
                      <SelectItem value="breakout">Breakout</SelectItem>
                      <SelectItem value="momentum">Momentum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stopLoss">Stop Loss (Pips)</Label>
                  <Input
                    id="stopLoss"
                    type="number"
                    value={inputs.strategyInfo.strategyParameters.stopLoss}
                    onChange={(e) => handleInputChange('strategyInfo.strategyParameters.stopLoss', parseFloat(e.target.value) || 0)}
                    placeholder="Enter stop loss in pips"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="takeProfit">Take Profit (Pips)</Label>
                  <Input
                    id="takeProfit"
                    type="number"
                    value={inputs.strategyInfo.strategyParameters.takeProfit}
                    onChange={(e) => handleInputChange('strategyInfo.strategyParameters.takeProfit', parseFloat(e.target.value) || 0)}
                    placeholder="Enter take profit in pips"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskRewardRatio">Risk/Reward Ratio</Label>
                  <Input
                    id="riskRewardRatio"
                    type="number"
                    step="0.1"
                    value={inputs.strategyInfo.strategyParameters.riskRewardRatio}
                    onChange={(e) => handleInputChange('strategyInfo.strategyParameters.riskRewardRatio', parseFloat(e.target.value) || 0)}
                    placeholder="Enter risk/reward ratio"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Conditions</CardTitle>
              <CardDescription>Configure market data and conditions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marketTrend">Market Trend</Label>
                  <Select
                    value={inputs.marketData.marketConditions.marketTrend}
                    onValueChange={(value) => handleInputChange('marketData.marketConditions.marketTrend', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select market trend" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bullish">Bullish</SelectItem>
                      <SelectItem value="bearish">Bearish</SelectItem>
                      <SelectItem value="sideways">Sideways</SelectItem>
                      <SelectItem value="volatile">Volatile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volatilityRegime">Volatility Regime</Label>
                  <Select
                    value={inputs.marketData.marketConditions.volatilityRegime}
                    onValueChange={(value) => handleInputChange('marketData.marketConditions.volatilityRegime', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select volatility regime" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="extreme">Extreme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketSentiment">Market Sentiment</Label>
                  <Select
                    value={inputs.marketData.marketConditions.marketSentiment}
                    onValueChange={(value) => handleInputChange('marketData.marketConditions.marketSentiment', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select market sentiment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bullish">Bullish</SelectItem>
                      <SelectItem value="bearish">Bearish</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskAppetite">Risk Appetite</Label>
                  <Select
                    value={inputs.marketData.marketConditions.riskAppetite}
                    onValueChange={(value) => handleInputChange('marketData.marketConditions.riskAppetite', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk appetite" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Management</CardTitle>
              <CardDescription>Configure risk management parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxPositionSize">Max Position Size</Label>
                  <Input
                    id="maxPositionSize"
                    type="number"
                    value={inputs.riskManagement.riskLimits.maxPositionSize}
                    onChange={(e) => handleInputChange('riskManagement.riskLimits.maxPositionSize', parseFloat(e.target.value) || 0)}
                    placeholder="Enter max position size"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxLeverage">Max Leverage</Label>
                  <Input
                    id="maxLeverage"
                    type="number"
                    value={inputs.riskManagement.riskLimits.maxLeverage}
                    onChange={(e) => handleInputChange('riskManagement.riskLimits.maxLeverage', parseInt(e.target.value) || 0)}
                    placeholder="Enter max leverage"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxDrawdown">Max Drawdown (%)</Label>
                  <Input
                    id="maxDrawdown"
                    type="number"
                    step="0.1"
                    value={inputs.riskManagement.riskLimits.maxDrawdown}
                    onChange={(e) => handleInputChange('riskManagement.riskLimits.maxDrawdown', parseFloat(e.target.value) || 0)}
                    placeholder="Enter max drawdown"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxDailyLoss">Max Daily Loss</Label>
                  <Input
                    id="maxDailyLoss"
                    type="number"
                    value={inputs.riskManagement.riskLimits.maxDailyLoss}
                    onChange={(e) => handleInputChange('riskManagement.riskLimits.maxDailyLoss', parseFloat(e.target.value) || 0)}
                    placeholder="Enter max daily loss"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {results ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Forex Trading Summary</CardTitle>
                  <CardDescription>Your forex trading analysis results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatPips(results.executiveSummary.pipValue)}
                      </div>
                      <div className="text-sm text-muted-foreground">Pip Value</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {formatPercentage(results.executiveSummary.marginUtilization)}
                      </div>
                      <div className="text-sm text-muted-foreground">Margin Utilization</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {results.executiveSummary.leverage}x
                      </div>
                      <div className="text-sm text-muted-foreground">Leverage</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Exchange Rate</Label>
                      <div className="text-lg font-semibold">
                        {results.executiveSummary.exchangeRate.toFixed(4)}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Swap Rate</Label>
                      <div className="text-lg font-semibold">
                        {formatPercentage(results.executiveSummary.swap)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Forex Trading Score</Label>
                    <Progress value={results.forexTradingScore.overallScore * 100} className="w-full" />
                    <div className="text-sm text-muted-foreground">
                      Score: {(results.forexTradingScore.overallScore * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Recommendation</Label>
                    <Badge variant={results.executiveSummary.recommendation === 'excellent' ? 'default' : 'secondary'}>
                      {results.executiveSummary.recommendation.charAt(0).toUpperCase() + results.executiveSummary.recommendation.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Total Return</Label>
                      <div className="text-lg font-semibold">
                        {formatPercentage(results.performance.performanceMetrics.totalReturn)}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Sharpe Ratio</Label>
                      <div className="text-lg font-semibold">
                        {results.performance.performanceMetrics.sharpeRatio.toFixed(2)}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Win Rate</Label>
                      <div className="text-lg font-semibold">
                        {formatPercentage(results.performance.performanceMetrics.winRate)}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Max Drawdown</Label>
                      <div className="text-lg font-semibold">
                        {formatPercentage(results.performance.performanceMetrics.maxDrawdown)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results.recommendations && results.recommendations.length > 0 ? (
                    <div className="space-y-2">
                      {results.recommendations.slice(0, 3).map((rec, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="font-semibold">{rec.category}</div>
                          <div className="text-sm text-muted-foreground">{rec.recommendation}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Expected improvement: {formatPercentage(rec.expectedImprovement)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No specific recommendations available</p>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  Enter forex trading information to see analysis results
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}