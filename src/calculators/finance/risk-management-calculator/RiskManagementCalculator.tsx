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
import { RiskManagementCalculatorInputs, RiskManagementCalculatorOutputs } from './types';
import { calculateRiskManagement } from './formulas';
import { validateRiskManagementCalculatorInputs } from './validation';
import { validateField } from './quickValidation';

export default function RiskManagementCalculator() {
  const [inputs, setInputs] = useState<RiskManagementCalculatorInputs>({
    portfolioInfo: {
      basicInfo: {
        portfolioName: '',
        portfolioType: 'balanced',
        totalValue: 0,
        currency: 'USD',
        benchmark: '',
        inceptionDate: '',
        lastRebalanceDate: '',
        nextRebalanceDate: '',
        rebalancingFrequency: 'quarterly',
        riskTolerance: 'moderate',
        investmentHorizon: 10,
        liquidityRequirements: 'medium'
      },
      portfolioHoldings: [],
      assetAllocation: [],
      sectorAllocation: [],
      geographicAllocation: []
    },
    riskMetrics: {
      volatilityMetrics: {
        portfolioVolatility: 0,
        annualizedVolatility: 0,
        dailyVolatility: 0,
        weeklyVolatility: 0,
        monthlyVolatility: 0,
        rollingVolatility: [],
        volatilityDecomposition: []
      },
      valueAtRisk: {
        historicalVaR: 0,
        parametricVaR: 0,
        monteCarloVaR: 0,
        conditionalVaR: 0,
        expectedShortfall: 0,
        varConfidenceLevel: 0.95,
        varTimeHorizon: 1
      },
      downsideRisk: {
        downsideDeviation: 0,
        semiDeviation: 0,
        downsidePotential: 0,
        downsideFrequency: 0,
        downsideMagnitude: 0
      },
      drawdownMetrics: {
        maxDrawdown: 0,
        currentDrawdown: 0,
        averageDrawdown: 0,
        drawdownDuration: 0,
        recoveryTime: 0,
        calmarRatio: 0
      },
      correlationMetrics: {
        portfolioCorrelation: 0,
        averageCorrelation: 0,
        correlationMatrix: [],
        correlationDecomposition: []
      },
      betaMetrics: {
        portfolioBeta: 0,
        weightedBeta: 0,
        betaDecomposition: [],
        systematicRisk: 0,
        idiosyncraticRisk: 0
      }
    },
    riskFactors: {
      marketRisk: {
        equityRisk: 0,
        interestRateRisk: 0,
        currencyRisk: 0,
        commodityRisk: 0,
        creditRisk: 0,
        volatilityRisk: 0
      },
      factorRisk: {
        sizeRisk: 0,
        valueRisk: 0,
        momentumRisk: 0,
        qualityRisk: 0,
        lowVolatilityRisk: 0,
        dividendRisk: 0
      },
      sectorRisk: {
        technologyRisk: 0,
        healthcareRisk: 0,
        financialRisk: 0,
        consumerRisk: 0,
        energyRisk: 0,
        industrialRisk: 0
      },
      geographicRisk: {
        domesticRisk: 0,
        developedMarketRisk: 0,
        emergingMarketRisk: 0,
        frontierMarketRisk: 0,
        regionalRisk: []
      },
      liquidityRisk: {
        bidAskSpread: 0,
        marketDepth: 0,
        tradingVolume: 0,
        liquidityScore: 0,
        illiquidAssets: 0
      },
      concentrationRisk: {
        topHoldingsConcentration: 0,
        sectorConcentration: 0,
        geographicConcentration: 0,
        currencyConcentration: 0,
        issuerConcentration: 0
      }
    },
    stressTesting: {
      scenarios: [],
      sensitivityAnalysis: [],
      stressTestResults: {
        worstCaseScenario: 0,
        bestCaseScenario: 0,
        expectedScenario: 0,
        stressTestScore: 0
      }
    },
    riskLimits: {
      positionLimits: [],
      sectorLimits: [],
      geographicLimits: [],
      riskLimits: [],
      limitBreaches: []
    },
    monitoring: {
      alerts: [],
      reports: [],
      dashboards: [],
      monitoringScore: 0
    }
  });

  const [results, setResults] = useState<RiskManagementCalculatorOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = validateRiskManagementCalculatorInputs(inputs);
    if (validation.isValid) {
      try {
        const calculatedResults = calculateRiskManagement(inputs);
        setResults(calculatedResults);
        setErrors({});
      } catch (error) {
        setErrors({ calculation: 'Error calculating risk management' });
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Risk Management Calculator</h1>
        <p className="text-muted-foreground">
          Comprehensive portfolio risk analysis and management tool
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

      <Tabs defaultValue="portfolio" className="space-y-4">
        <TabsList>
          <TabsTrigger value="portfolio">Portfolio Info</TabsTrigger>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="riskMetrics">Risk Metrics</TabsTrigger>
          <TabsTrigger value="riskFactors">Risk Factors</TabsTrigger>
          <TabsTrigger value="stressTesting">Stress Testing</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Information</CardTitle>
              <CardDescription>Enter basic portfolio information and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="portfolioName">Portfolio Name</Label>
                  <Input
                    id="portfolioName"
                    value={inputs.portfolioInfo.basicInfo.portfolioName}
                    onChange={(e) => handleInputChange('portfolioInfo.basicInfo.portfolioName', e.target.value)}
                    placeholder="Enter portfolio name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="portfolioType">Portfolio Type</Label>
                  <Select
                    value={inputs.portfolioInfo.basicInfo.portfolioType}
                    onValueChange={(value) => handleInputChange('portfolioInfo.basicInfo.portfolioType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select portfolio type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equity">Equity</SelectItem>
                      <SelectItem value="fixed_income">Fixed Income</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="alternative">Alternative</SelectItem>
                      <SelectItem value="multi_asset">Multi-Asset</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalValue">Total Portfolio Value</Label>
                  <Input
                    id="totalValue"
                    type="number"
                    value={inputs.portfolioInfo.basicInfo.totalValue}
                    onChange={(e) => handleInputChange('portfolioInfo.basicInfo.totalValue', parseFloat(e.target.value) || 0)}
                    placeholder="Enter total portfolio value"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                  <Select
                    value={inputs.portfolioInfo.basicInfo.riskTolerance}
                    onValueChange={(value) => handleInputChange('portfolioInfo.basicInfo.riskTolerance', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk tolerance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                      <SelectItem value="very_aggressive">Very Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="investmentHorizon">Investment Horizon (Years)</Label>
                  <Input
                    id="investmentHorizon"
                    type="number"
                    value={inputs.portfolioInfo.basicInfo.investmentHorizon}
                    onChange={(e) => handleInputChange('portfolioInfo.basicInfo.investmentHorizon', parseInt(e.target.value) || 0)}
                    placeholder="Enter investment horizon"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="liquidityRequirements">Liquidity Requirements</Label>
                  <Select
                    value={inputs.portfolioInfo.basicInfo.liquidityRequirements}
                    onValueChange={(value) => handleInputChange('portfolioInfo.basicInfo.liquidityRequirements', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select liquidity requirements" />
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

        <TabsContent value="holdings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Holdings</CardTitle>
              <CardDescription>Add individual holdings to your portfolio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assetName">Asset Name</Label>
                  <Input
                    id="assetName"
                    placeholder="Enter asset name"
                    onChange={(e) => {
                      const assetName = e.target.value;
                      if (assetName && inputs.portfolioInfo.portfolioHoldings.length === 0) {
                        const newHolding = {
                          asset: assetName,
                          symbol: assetName.substring(0, 3).toUpperCase(),
                          assetType: 'stock',
                          quantity: 1000,
                          price: 100,
                          marketValue: 100000,
                          weight: 1.0,
                          sector: 'Technology',
                          country: 'USA',
                          currency: 'USD',
                          beta: 1.0,
                          volatility: 0.2,
                          correlation: 0.5,
                          expectedReturn: 0.08,
                          riskFreeRate: 0.03,
                          marketReturn: 0.10
                        };
                        handleInputChange('portfolioInfo.portfolioHoldings', [newHolding]);
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketValue">Market Value</Label>
                  <Input
                    id="marketValue"
                    type="number"
                    placeholder="Enter market value"
                    onChange={(e) => {
                      const marketValue = parseFloat(e.target.value) || 0;
                      if (inputs.portfolioInfo.portfolioHoldings.length > 0) {
                        const updated = [...inputs.portfolioInfo.portfolioHoldings];
                        updated[0] = {
                          ...updated[0],
                          marketValue,
                          price: marketValue / updated[0].quantity
                        };
                        handleInputChange('portfolioInfo.portfolioHoldings', updated);
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volatility">Volatility</Label>
                  <Input
                    id="volatility"
                    type="number"
                    placeholder="Enter volatility (0-1)"
                    onChange={(e) => {
                      const volatility = parseFloat(e.target.value) || 0;
                      if (inputs.portfolioInfo.portfolioHoldings.length > 0) {
                        const updated = [...inputs.portfolioInfo.portfolioHoldings];
                        updated[0] = {
                          ...updated[0],
                          volatility
                        };
                        handleInputChange('portfolioInfo.portfolioHoldings', updated);
                      }
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="riskMetrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Metrics Configuration</CardTitle>
              <CardDescription>Configure risk calculation parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="varConfidenceLevel">VaR Confidence Level</Label>
                  <Input
                    id="varConfidenceLevel"
                    type="number"
                    value={inputs.riskMetrics.valueAtRisk.varConfidenceLevel}
                    onChange={(e) => handleInputChange('riskMetrics.valueAtRisk.varConfidenceLevel', parseFloat(e.target.value) || 0)}
                    placeholder="Enter VaR confidence level (0-1)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="varTimeHorizon">VaR Time Horizon (Days)</Label>
                  <Input
                    id="varTimeHorizon"
                    type="number"
                    value={inputs.riskMetrics.valueAtRisk.varTimeHorizon}
                    onChange={(e) => handleInputChange('riskMetrics.valueAtRisk.varTimeHorizon', parseInt(e.target.value) || 0)}
                    placeholder="Enter VaR time horizon"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="riskFactors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Factors</CardTitle>
              <CardDescription>Configure risk factor exposures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="equityRisk">Equity Risk</Label>
                  <Input
                    id="equityRisk"
                    type="number"
                    value={inputs.riskFactors.marketRisk.equityRisk}
                    onChange={(e) => handleInputChange('riskFactors.marketRisk.equityRisk', parseFloat(e.target.value) || 0)}
                    placeholder="Enter equity risk exposure"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestRateRisk">Interest Rate Risk</Label>
                  <Input
                    id="interestRateRisk"
                    type="number"
                    value={inputs.riskFactors.marketRisk.interestRateRisk}
                    onChange={(e) => handleInputChange('riskFactors.marketRisk.interestRateRisk', parseFloat(e.target.value) || 0)}
                    placeholder="Enter interest rate risk exposure"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currencyRisk">Currency Risk</Label>
                  <Input
                    id="currencyRisk"
                    type="number"
                    value={inputs.riskFactors.marketRisk.currencyRisk}
                    onChange={(e) => handleInputChange('riskFactors.marketRisk.currencyRisk', parseFloat(e.target.value) || 0)}
                    placeholder="Enter currency risk exposure"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="creditRisk">Credit Risk</Label>
                  <Input
                    id="creditRisk"
                    type="number"
                    value={inputs.riskFactors.marketRisk.creditRisk}
                    onChange={(e) => handleInputChange('riskFactors.marketRisk.creditRisk', parseFloat(e.target.value) || 0)}
                    placeholder="Enter credit risk exposure"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stressTesting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stress Testing</CardTitle>
              <CardDescription>Configure stress testing scenarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marketShock">Market Shock (%)</Label>
                  <Input
                    id="marketShock"
                    type="number"
                    placeholder="Enter market shock percentage"
                    onChange={(e) => {
                      const shock = parseFloat(e.target.value) || 0;
                      const scenario = {
                        name: 'Market Shock',
                        description: `${shock}% market decline`,
                        marketShock: shock / 100,
                        interestRateShock: 0,
                        currencyShock: 0,
                        commodityShock: 0,
                        probability: 0.01,
                        impact: 0
                      };
                      handleInputChange('stressTesting.scenarios', [scenario]);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestRateShock">Interest Rate Shock (%)</Label>
                  <Input
                    id="interestRateShock"
                    type="number"
                    placeholder="Enter interest rate shock percentage"
                    onChange={(e) => {
                      const shock = parseFloat(e.target.value) || 0;
                      const scenario = {
                        name: 'Interest Rate Shock',
                        description: `${shock}% interest rate increase`,
                        marketShock: 0,
                        interestRateShock: shock / 100,
                        currencyShock: 0,
                        commodityShock: 0,
                        probability: 0.01,
                        impact: 0
                      };
                      handleInputChange('stressTesting.scenarios', [scenario]);
                    }}
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
                  <CardTitle>Risk Management Summary</CardTitle>
                  <CardDescription>Your portfolio risk analysis results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {formatPercentage(results.portfolioVolatility)}
                      </div>
                      <div className="text-sm text-muted-foreground">Portfolio Volatility</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {formatCurrency(results.valueAtRisk)}
                      </div>
                      <div className="text-sm text-muted-foreground">Value at Risk (95%)</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {formatCurrency(results.expectedShortfall)}
                      </div>
                      <div className="text-sm text-muted-foreground">Expected Shortfall</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Maximum Drawdown</Label>
                      <div className="text-lg font-semibold">
                        {formatPercentage(results.maxDrawdown)}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Sharpe Ratio</Label>
                      <div className="text-lg font-semibold">
                        {results.sharpeRatio.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Risk Management Score</Label>
                    <Progress value={results.riskManagementScore * 100} className="w-full" />
                    <div className="text-sm text-muted-foreground">
                      Score: {(results.riskManagementScore * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Recommendation</Label>
                    <Badge variant={results.recommendation === 'excellent' ? 'default' : 'secondary'}>
                      {results.recommendation.charAt(0).toUpperCase() + results.recommendation.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Risk Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Information Ratio</Label>
                      <div className="text-lg font-semibold">
                        {results.informationRatio.toFixed(2)}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Beta</Label>
                      <div className="text-lg font-semibold">
                        {results.portfolioBeta.toFixed(2)}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Downside Deviation</Label>
                      <div className="text-lg font-semibold">
                        {formatPercentage(results.downsideDeviation)}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Calmar Ratio</Label>
                      <div className="text-lg font-semibold">
                        {results.calmarRatio.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Recommendations</CardTitle>
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
                  Enter portfolio information and holdings to see risk management results
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}