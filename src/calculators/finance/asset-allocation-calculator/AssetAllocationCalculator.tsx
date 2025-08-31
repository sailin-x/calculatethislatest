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
import { AssetAllocationCalculatorInputs, AssetAllocationCalculatorOutputs } from './types';
import { calculateAssetAllocation } from './formulas';
import { validateAssetAllocationCalculatorInputs } from './validation';
import { validateField } from './quickValidation';

export default function AssetAllocationCalculator() {
  const [inputs, setInputs] = useState<AssetAllocationCalculatorInputs>({
    portfolioInfo: {
      basicInfo: {
        portfolioName: '',
        portfolioType: 'individual',
        totalValue: 100000,
        currency: 'USD',
        baseCurrency: 'USD',
        investmentHorizon: 10,
        riskTolerance: 'moderate',
        liquidityRequirements: 'medium',
        taxStatus: 'taxable',
        regulatoryConstraints: [],
        investmentConstraints: []
      },
      currentPortfolio: [],
      currentAllocation: [],
      investmentGoals: [],
      cashFlowRequirements: []
    },
    assetClasses: {
      equity: {
        domesticLargeCap: {
          expectedReturn: 8.5,
          volatility: 16.0,
          correlation: 0.85,
          beta: 1.0,
          sharpeRatio: 0.4,
          maxDrawdown: 25.0,
          liquidity: 'high',
          taxEfficiency: 0.8,
          minimumInvestment: 1000,
          maximumInvestment: 1000000
        },
        domesticMidCap: {
          expectedReturn: 9.5,
          volatility: 18.0,
          correlation: 0.75,
          beta: 1.1,
          sharpeRatio: 0.45,
          maxDrawdown: 30.0,
          liquidity: 'medium',
          taxEfficiency: 0.7,
          minimumInvestment: 5000,
          maximumInvestment: 500000
        },
        domesticSmallCap: {
          expectedReturn: 10.5,
          volatility: 22.0,
          correlation: 0.65,
          beta: 1.2,
          sharpeRatio: 0.4,
          maxDrawdown: 35.0,
          liquidity: 'medium',
          taxEfficiency: 0.6,
          minimumInvestment: 10000,
          maximumInvestment: 250000
        },
        internationalDeveloped: {
          expectedReturn: 7.5,
          volatility: 18.0,
          correlation: 0.7,
          beta: 0.9,
          sharpeRatio: 0.35,
          maxDrawdown: 30.0,
          liquidity: 'high',
          taxEfficiency: 0.6,
          minimumInvestment: 5000,
          maximumInvestment: 750000
        },
        internationalEmerging: {
          expectedReturn: 9.0,
          volatility: 25.0,
          correlation: 0.6,
          beta: 1.1,
          sharpeRatio: 0.3,
          maxDrawdown: 40.0,
          liquidity: 'medium',
          taxEfficiency: 0.5,
          minimumInvestment: 10000,
          maximumInvestment: 500000
        }
      },
      fixedIncome: {
        governmentBonds: {
          expectedReturn: 3.5,
          volatility: 5.0,
          correlation: 0.2,
          beta: 0.1,
          sharpeRatio: 0.5,
          maxDrawdown: 8.0,
          liquidity: 'high',
          taxEfficiency: 0.9,
          minimumInvestment: 1000,
          maximumInvestment: 1000000
        },
        corporateBonds: {
          expectedReturn: 4.5,
          volatility: 8.0,
          correlation: 0.4,
          beta: 0.3,
          sharpeRatio: 0.4,
          maxDrawdown: 12.0,
          liquidity: 'high',
          taxEfficiency: 0.7,
          minimumInvestment: 1000,
          maximumInvestment: 1000000
        },
        highYieldBonds: {
          expectedReturn: 6.5,
          volatility: 12.0,
          correlation: 0.6,
          beta: 0.5,
          sharpeRatio: 0.4,
          maxDrawdown: 18.0,
          liquidity: 'medium',
          taxEfficiency: 0.6,
          minimumInvestment: 5000,
          maximumInvestment: 500000
        },
        municipalBonds: {
          expectedReturn: 3.0,
          volatility: 6.0,
          correlation: 0.3,
          beta: 0.2,
          sharpeRatio: 0.4,
          maxDrawdown: 10.0,
          liquidity: 'medium',
          taxEfficiency: 1.0,
          minimumInvestment: 5000,
          maximumInvestment: 750000
        }
      },
      cash: {
        moneyMarket: {
          expectedReturn: 2.0,
          volatility: 1.0,
          correlation: 0.1,
          beta: 0.0,
          sharpeRatio: 1.5,
          maxDrawdown: 0.5,
          liquidity: 'high',
          taxEfficiency: 0.8,
          minimumInvestment: 1000,
          maximumInvestment: 1000000
        },
        savingsAccount: {
          expectedReturn: 1.5,
          volatility: 0.5,
          correlation: 0.0,
          beta: 0.0,
          sharpeRatio: 2.0,
          maxDrawdown: 0.0,
          liquidity: 'high',
          taxEfficiency: 0.7,
          minimumInvestment: 100,
          maximumInvestment: 1000000
        }
      },
      realEstate: {
        reits: {
          expectedReturn: 7.0,
          volatility: 20.0,
          correlation: 0.5,
          beta: 0.8,
          sharpeRatio: 0.3,
          maxDrawdown: 35.0,
          liquidity: 'medium',
          taxEfficiency: 0.4,
          minimumInvestment: 10000,
          maximumInvestment: 500000
        },
        directRealEstate: {
          expectedReturn: 8.0,
          volatility: 15.0,
          correlation: 0.3,
          beta: 0.5,
          sharpeRatio: 0.4,
          maxDrawdown: 25.0,
          liquidity: 'low',
          taxEfficiency: 0.3,
          minimumInvestment: 50000,
          maximumInvestment: 2000000
        }
      },
      commodities: {
        gold: {
          expectedReturn: 4.0,
          volatility: 18.0,
          correlation: 0.1,
          beta: 0.0,
          sharpeRatio: 0.2,
          maxDrawdown: 30.0,
          liquidity: 'high',
          taxEfficiency: 0.6,
          minimumInvestment: 1000,
          maximumInvestment: 1000000
        },
        oil: {
          expectedReturn: 5.0,
          volatility: 30.0,
          correlation: 0.2,
          beta: 0.1,
          sharpeRatio: 0.15,
          maxDrawdown: 50.0,
          liquidity: 'high',
          taxEfficiency: 0.5,
          minimumInvestment: 5000,
          maximumInvestment: 500000
        }
      },
      alternatives: {
        hedgeFunds: {
          expectedReturn: 8.0,
          volatility: 12.0,
          correlation: 0.3,
          beta: 0.4,
          sharpeRatio: 0.5,
          maxDrawdown: 15.0,
          liquidity: 'low',
          taxEfficiency: 0.8,
          minimumInvestment: 100000,
          maximumInvestment: 5000000
        },
        privateEquity: {
          expectedReturn: 12.0,
          volatility: 25.0,
          correlation: 0.4,
          beta: 0.6,
          sharpeRatio: 0.4,
          maxDrawdown: 40.0,
          liquidity: 'low',
          taxEfficiency: 0.7,
          minimumInvestment: 250000,
          maximumInvestment: 10000000
        }
      }
    },
    optimizationSettings: {
      optimizationMethod: 'mean-variance',
      riskFreeRate: 2.0,
      targetReturn: 8.0,
      targetVolatility: 15.0,
      rebalancingFrequency: 'quarterly',
      transactionCosts: 0.5,
      taxRate: 25.0,
      inflationRate: 2.5,
      monteCarloSettings: {
        numberOfSimulations: 10000,
        timeHorizon: 10,
        confidenceLevel: 0.95
      }
    }
  });

  const [results, setResults] = useState<AssetAllocationCalculatorOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = validateAssetAllocationCalculatorInputs(inputs);
    if (!validation.isValid) {
      setErrors(validation.errors || {});
    } else {
      setErrors({});
      try {
        const calculatedResults = calculateAssetAllocation(inputs);
        setResults(calculatedResults);
      } catch (error) {
        console.error('Calculation error:', error);
        setErrors({ calculation: 'Error performing calculation' });
      }
    }
  }, [inputs]);

  const handleInputChange = (field: string, value: any) => {
    const newInputs = { ...inputs };
    const fieldPath = field.split('.');
    let current: any = newInputs;
    
    for (let i = 0; i < fieldPath.length - 1; i++) {
      current = current[fieldPath[i]];
    }
    
    current[fieldPath[fieldPath.length - 1]] = value;
    
    // Quick validation
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
    
    setInputs(newInputs);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Asset Allocation Calculator</h1>
        <p className="text-muted-foreground">
          Optimize your investment portfolio allocation based on risk tolerance, goals, and market conditions.
        </p>
      </div>

      <Tabs defaultValue="inputs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inputs">Portfolio Inputs</TabsTrigger>
          <TabsTrigger value="results">Optimized Allocation</TabsTrigger>
          <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Analysis</TabsTrigger>
          <TabsTrigger value="rebalancing">Rebalancing</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Portfolio Information</CardTitle>
              <CardDescription>Enter your portfolio details and investment preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="portfolioName">Portfolio Name</Label>
                  <Input
                    id="portfolioName"
                    value={inputs.portfolioInfo.basicInfo.portfolioName}
                    onChange={(e) => handleInputChange('portfolioInfo.basicInfo.portfolioName', e.target.value)}
                    placeholder="My Investment Portfolio"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolioType">Portfolio Type</Label>
                  <Select
                    value={inputs.portfolioInfo.basicInfo.portfolioType}
                    onValueChange={(value) => handleInputChange('portfolioInfo.basicInfo.portfolioType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="institutional">Institutional</SelectItem>
                      <SelectItem value="endowment">Endowment</SelectItem>
                      <SelectItem value="pension">Pension</SelectItem>
                      <SelectItem value="foundation">Foundation</SelectItem>
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
                    placeholder="100000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="investmentHorizon">Investment Horizon (Years)</Label>
                  <Input
                    id="investmentHorizon"
                    type="number"
                    value={inputs.portfolioInfo.basicInfo.investmentHorizon}
                    onChange={(e) => handleInputChange('portfolioInfo.basicInfo.investmentHorizon', parseInt(e.target.value) || 0)}
                    placeholder="10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                  <Select
                    value={inputs.portfolioInfo.basicInfo.riskTolerance}
                    onValueChange={(value) => handleInputChange('portfolioInfo.basicInfo.riskTolerance', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very_conservative">Very Conservative</SelectItem>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                      <SelectItem value="very_aggressive">Very Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="liquidityRequirements">Liquidity Requirements</Label>
                  <Select
                    value={inputs.portfolioInfo.basicInfo.liquidityRequirements}
                    onValueChange={(value) => handleInputChange('portfolioInfo.basicInfo.liquidityRequirements', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
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

          <Card>
            <CardHeader>
              <CardTitle>Optimization Settings</CardTitle>
              <CardDescription>Configure optimization parameters and constraints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="optimizationMethod">Optimization Method</Label>
                  <Select
                    value={inputs.optimizationSettings.optimizationMethod}
                    onValueChange={(value) => handleInputChange('optimizationSettings.optimizationMethod', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mean-variance">Mean-Variance</SelectItem>
                      <SelectItem value="black-litterman">Black-Litterman</SelectItem>
                      <SelectItem value="risk-parity">Risk Parity</SelectItem>
                      <SelectItem value="maximum-sharpe">Maximum Sharpe Ratio</SelectItem>
                      <SelectItem value="minimum-variance">Minimum Variance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetReturn">Target Return (%)</Label>
                  <Input
                    id="targetReturn"
                    type="number"
                    value={inputs.optimizationSettings.targetReturn}
                    onChange={(e) => handleInputChange('optimizationSettings.targetReturn', parseFloat(e.target.value) || 0)}
                    placeholder="8.0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetVolatility">Target Volatility (%)</Label>
                  <Input
                    id="targetVolatility"
                    type="number"
                    value={inputs.optimizationSettings.targetVolatility}
                    onChange={(e) => handleInputChange('optimizationSettings.targetVolatility', parseFloat(e.target.value) || 0)}
                    placeholder="15.0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskFreeRate">Risk-Free Rate (%)</Label>
                  <Input
                    id="riskFreeRate"
                    type="number"
                    value={inputs.optimizationSettings.riskFreeRate}
                    onChange={(e) => handleInputChange('optimizationSettings.riskFreeRate', parseFloat(e.target.value) || 0)}
                    placeholder="2.0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {results ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Optimized Asset Allocation</CardTitle>
                  <CardDescription>Recommended portfolio weights based on your inputs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Expected Portfolio Metrics</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Expected Return:</span>
                          <span className="font-medium">{formatPercentage(results.optimizedAllocation.expectedReturn)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expected Volatility:</span>
                          <span className="font-medium">{formatPercentage(results.optimizedAllocation.expectedVolatility)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sharpe Ratio:</span>
                          <span className="font-medium">{results.optimizedAllocation.sharpeRatio.toFixed(3)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Maximum Drawdown:</span>
                          <span className="font-medium">{formatPercentage(results.optimizedAllocation.maxDrawdown)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Asset Class Weights</h3>
                      <div className="space-y-2">
                        {results.optimizedAllocation.assetAllocation.map((allocation, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span>{allocation.assetClass}</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={allocation.weight} className="w-20" />
                              <span className="font-medium">{formatPercentage(allocation.weight)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  Enter your portfolio information to see optimized allocation results.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          {results ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Risk Analysis</CardTitle>
                  <CardDescription>Detailed risk metrics and analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Risk Metrics</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>VaR (95%):</span>
                          <span className="font-medium">{formatPercentage(results.riskAnalysis.var95)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>CVaR (95%):</span>
                          <span className="font-medium">{formatPercentage(results.riskAnalysis.cvar95)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Beta:</span>
                          <span className="font-medium">{results.riskAnalysis.beta.toFixed(3)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Correlation with Market:</span>
                          <span className="font-medium">{results.riskAnalysis.correlationWithMarket.toFixed(3)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Risk Decomposition</h3>
                      <div className="space-y-2">
                        {results.riskAnalysis.riskContribution.map((contribution, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{contribution.assetClass}</span>
                            <span className="font-medium">{formatPercentage(contribution.contribution)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  Complete the portfolio inputs to see risk analysis results.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          {results ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Scenario Analysis</CardTitle>
                  <CardDescription>Portfolio performance under different market scenarios</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.scenarioAnalysis.scenarios.map((scenario, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">{scenario.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Expected Return:</span>
                              <span className="font-medium">{formatPercentage(scenario.expectedReturn)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Volatility:</span>
                              <span className="font-medium">{formatPercentage(scenario.volatility)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sharpe Ratio:</span>
                              <span className="font-medium">{scenario.sharpeRatio.toFixed(3)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Max Drawdown:</span>
                              <span className="font-medium">{formatPercentage(scenario.maxDrawdown)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  Complete the portfolio inputs to see scenario analysis results.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rebalancing" className="space-y-4">
          {results ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Rebalancing Strategy</CardTitle>
                  <CardDescription>Recommended rebalancing frequency and thresholds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Rebalancing Recommendations</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Frequency:</span>
                          <span className="font-medium">{results.rebalancingStrategy.recommendedFrequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Threshold:</span>
                          <span className="font-medium">{formatPercentage(results.rebalancingStrategy.rebalancingThreshold)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expected Cost:</span>
                          <span className="font-medium">{formatCurrency(results.rebalancingStrategy.expectedRebalancingCost)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Current vs Target Allocation</h3>
                      <div className="space-y-2">
                        {results.rebalancingStrategy.allocationComparison.map((comparison, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span>{comparison.assetClass}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">{formatPercentage(comparison.currentWeight)}</span>
                              <span>→</span>
                              <span className="font-medium">{formatPercentage(comparison.targetWeight)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  Complete the portfolio inputs to see rebalancing recommendations.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            <ul className="list-disc list-inside">
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
            <ul className="list-disc list-inside">
              {Object.entries(warnings).map(([field, warning]) => (
                <li key={field}>{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}