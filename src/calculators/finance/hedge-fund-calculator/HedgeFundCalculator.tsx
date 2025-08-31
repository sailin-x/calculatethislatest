import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { HedgeFundInputs, HedgeFundOutputs } from './types';
import { calculateHedgeFund } from './formulas';
import { validateHedgeFundInputs } from './validation';
import { validateField } from './quickValidation';

export default function HedgeFundCalculator() {
  const [inputs, setInputs] = useState<HedgeFundInputs>({
    // Fund Information
    fundName: '',
    fundType: 'long-short',
    strategy: 'equity',
    inceptionDate: '',
    fundSize: 100000000,
    minimumInvestment: 1000000,
    lockupPeriod: 12,
    redemptionFrequency: 'quarterly',
    
    // Performance Metrics
    annualReturn: 12,
    volatility: 15,
    sharpeRatio: 0.8,
    maxDrawdown: -8,
    beta: 0.6,
    alpha: 3,
    informationRatio: 0.5,
    sortinoRatio: 1.2,
    calmarRatio: 1.5,
    
    // Fee Structure
    managementFee: 2,
    performanceFee: 20,
    hurdleRate: 8,
    highWaterMark: true,
    catchUp: false,
    catchUpRate: 80,
    
    // Risk Metrics
    var95: -2.5,
    var99: -4.0,
    expectedShortfall: -3.5,
    correlation: 0.3,
    trackingError: 5,
    
    // Market Data
    benchmarkReturn: 10,
    benchmarkVolatility: 18,
    riskFreeRate: 2,
    marketReturn: 9,
    marketVolatility: 16,
    
    // Additional Information
    leverage: 1.5,
    shortExposure: 30,
    sectorConcentration: 25,
    geographicConcentration: 40,
    currencyExposure: 15,
    
    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'percentage',
    includeCharts: true,
    includeProjections: true
  });

  const [results, setResults] = useState<HedgeFundOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = validateHedgeFundInputs(inputs);
    if (validation.isValid) {
      try {
        const calculatedResults = calculateHedgeFund(inputs);
        setResults(calculatedResults);
        setErrors({});
      } catch (error) {
        setErrors({ calculation: 'Error calculating hedge fund metrics' });
      }
    } else {
      setErrors(validation.errors || {});
    }
  }, [inputs]);

  const handleInputChange = (field: keyof HedgeFundInputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);

    // Quick validation
    const fieldValidation = validateField(field, value, newInputs);
    if (!fieldValidation.isValid) {
      setErrors(prev => ({ ...prev, [field]: fieldValidation.error || '' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    if (fieldValidation.warning) {
      setWarnings(prev => ({ ...prev, [field]: fieldValidation.warning || '' }));
    } else {
      setWarnings(prev => {
        const newWarnings = { ...prev };
        delete newWarnings[field];
        return newWarnings;
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: inputs.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Hedge Fund Calculator</h1>
        <p className="text-muted-foreground">
          Analyze hedge fund performance, risk metrics, and fee structures
        </p>
      </div>

      <Tabs defaultValue="inputs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Fund Information */}
            <Card>
              <CardHeader>
                <CardTitle>Fund Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fundName">Fund Name</Label>
                  <Input
                    id="fundName"
                    value={inputs.fundName}
                    onChange={(e) => handleInputChange('fundName', e.target.value)}
                    className={errors.fundName ? 'border-red-500' : ''}
                  />
                  {errors.fundName && <p className="text-sm text-red-500">{errors.fundName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fundType">Fund Type</Label>
                  <Select value={inputs.fundType} onValueChange={(value) => handleInputChange('fundType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="long-short">Long-Short</SelectItem>
                      <SelectItem value="global-macro">Global Macro</SelectItem>
                      <SelectItem value="event-driven">Event-Driven</SelectItem>
                      <SelectItem value="relative-value">Relative Value</SelectItem>
                      <SelectItem value="managed-futures">Managed Futures</SelectItem>
                      <SelectItem value="multi-strategy">Multi-Strategy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="strategy">Strategy</Label>
                  <Select value={inputs.strategy} onValueChange={(value) => handleInputChange('strategy', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equity">Equity</SelectItem>
                      <SelectItem value="fixed-income">Fixed Income</SelectItem>
                      <SelectItem value="commodities">Commodities</SelectItem>
                      <SelectItem value="currencies">Currencies</SelectItem>
                      <SelectItem value="derivatives">Derivatives</SelectItem>
                      <SelectItem value="multi-asset">Multi-Asset</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fundSize">Fund Size</Label>
                  <Input
                    id="fundSize"
                    type="number"
                    value={inputs.fundSize}
                    onChange={(e) => handleInputChange('fundSize', parseFloat(e.target.value) || 0)}
                    className={errors.fundSize ? 'border-red-500' : ''}
                  />
                  {errors.fundSize && <p className="text-sm text-red-500">{errors.fundSize}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minimumInvestment">Minimum Investment</Label>
                  <Input
                    id="minimumInvestment"
                    type="number"
                    value={inputs.minimumInvestment}
                    onChange={(e) => handleInputChange('minimumInvestment', parseFloat(e.target.value) || 0)}
                    className={errors.minimumInvestment ? 'border-red-500' : ''}
                  />
                  {errors.minimumInvestment && <p className="text-sm text-red-500">{errors.minimumInvestment}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lockupPeriod">Lockup Period (Months)</Label>
                  <Input
                    id="lockupPeriod"
                    type="number"
                    value={inputs.lockupPeriod}
                    onChange={(e) => handleInputChange('lockupPeriod', parseInt(e.target.value) || 0)}
                    className={errors.lockupPeriod ? 'border-red-500' : ''}
                  />
                  {errors.lockupPeriod && <p className="text-sm text-red-500">{errors.lockupPeriod}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="annualReturn">Annual Return (%)</Label>
                  <Input
                    id="annualReturn"
                    type="number"
                    step="0.01"
                    value={inputs.annualReturn}
                    onChange={(e) => handleInputChange('annualReturn', parseFloat(e.target.value) || 0)}
                    className={errors.annualReturn ? 'border-red-500' : ''}
                  />
                  {errors.annualReturn && <p className="text-sm text-red-500">{errors.annualReturn}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volatility">Volatility (%)</Label>
                  <Input
                    id="volatility"
                    type="number"
                    step="0.01"
                    value={inputs.volatility}
                    onChange={(e) => handleInputChange('volatility', parseFloat(e.target.value) || 0)}
                    className={errors.volatility ? 'border-red-500' : ''}
                  />
                  {errors.volatility && <p className="text-sm text-red-500">{errors.volatility}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sharpeRatio">Sharpe Ratio</Label>
                  <Input
                    id="sharpeRatio"
                    type="number"
                    step="0.01"
                    value={inputs.sharpeRatio}
                    onChange={(e) => handleInputChange('sharpeRatio', parseFloat(e.target.value) || 0)}
                    className={errors.sharpeRatio ? 'border-red-500' : ''}
                  />
                  {errors.sharpeRatio && <p className="text-sm text-red-500">{errors.sharpeRatio}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxDrawdown">Maximum Drawdown (%)</Label>
                  <Input
                    id="maxDrawdown"
                    type="number"
                    step="0.01"
                    value={inputs.maxDrawdown}
                    onChange={(e) => handleInputChange('maxDrawdown', parseFloat(e.target.value) || 0)}
                    className={errors.maxDrawdown ? 'border-red-500' : ''}
                  />
                  {errors.maxDrawdown && <p className="text-sm text-red-500">{errors.maxDrawdown}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="beta">Beta</Label>
                  <Input
                    id="beta"
                    type="number"
                    step="0.01"
                    value={inputs.beta}
                    onChange={(e) => handleInputChange('beta', parseFloat(e.target.value) || 0)}
                    className={errors.beta ? 'border-red-500' : ''}
                  />
                  {errors.beta && <p className="text-sm text-red-500">{errors.beta}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alpha">Alpha (%)</Label>
                  <Input
                    id="alpha"
                    type="number"
                    step="0.01"
                    value={inputs.alpha}
                    onChange={(e) => handleInputChange('alpha', parseFloat(e.target.value) || 0)}
                    className={errors.alpha ? 'border-red-500' : ''}
                  />
                  {errors.alpha && <p className="text-sm text-red-500">{errors.alpha}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Fee Structure */}
            <Card>
              <CardHeader>
                <CardTitle>Fee Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="managementFee">Management Fee (%)</Label>
                  <Input
                    id="managementFee"
                    type="number"
                    step="0.01"
                    value={inputs.managementFee}
                    onChange={(e) => handleInputChange('managementFee', parseFloat(e.target.value) || 0)}
                    className={errors.managementFee ? 'border-red-500' : ''}
                  />
                  {errors.managementFee && <p className="text-sm text-red-500">{errors.managementFee}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="performanceFee">Performance Fee (%)</Label>
                  <Input
                    id="performanceFee"
                    type="number"
                    step="0.01"
                    value={inputs.performanceFee}
                    onChange={(e) => handleInputChange('performanceFee', parseFloat(e.target.value) || 0)}
                    className={errors.performanceFee ? 'border-red-500' : ''}
                  />
                  {errors.performanceFee && <p className="text-sm text-red-500">{errors.performanceFee}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hurdleRate">Hurdle Rate (%)</Label>
                  <Input
                    id="hurdleRate"
                    type="number"
                    step="0.01"
                    value={inputs.hurdleRate}
                    onChange={(e) => handleInputChange('hurdleRate', parseFloat(e.target.value) || 0)}
                    className={errors.hurdleRate ? 'border-red-500' : ''}
                  />
                  {errors.hurdleRate && <p className="text-sm text-red-500">{errors.hurdleRate}</p>}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="highWaterMark"
                    checked={inputs.highWaterMark}
                    onCheckedChange={(checked) => handleInputChange('highWaterMark', checked)}
                  />
                  <Label htmlFor="highWaterMark">High Water Mark</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="catchUp"
                    checked={inputs.catchUp}
                    onCheckedChange={(checked) => handleInputChange('catchUp', checked)}
                  />
                  <Label htmlFor="catchUp">Catch-Up Provision</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="catchUpRate">Catch-Up Rate (%)</Label>
                  <Input
                    id="catchUpRate"
                    type="number"
                    step="0.01"
                    value={inputs.catchUpRate}
                    onChange={(e) => handleInputChange('catchUpRate', parseFloat(e.target.value) || 0)}
                    className={errors.catchUpRate ? 'border-red-500' : ''}
                    disabled={!inputs.catchUp}
                  />
                  {errors.catchUpRate && <p className="text-sm text-red-500">{errors.catchUpRate}</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Key Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Net Return:</span>
                    <span className={`font-bold ${results.metrics.netReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(results.metrics.netReturn)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sharpe Ratio:</span>
                    <span className="font-bold">{results.metrics.sharpeRatio.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sortino Ratio:</span>
                    <span className="font-bold">{results.metrics.sortinoRatio.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Calmar Ratio:</span>
                    <span className="font-bold">{results.metrics.calmarRatio.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Information Ratio:</span>
                    <span className="font-bold">{results.metrics.informationRatio.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>VaR (95%):</span>
                    <span className="font-bold text-red-600">{formatPercentage(results.metrics.var95)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VaR (99%):</span>
                    <span className="font-bold text-red-600">{formatPercentage(results.metrics.var99)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Shortfall:</span>
                    <span className="font-bold text-red-600">{formatPercentage(results.metrics.expectedShortfall)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maximum Drawdown:</span>
                    <span className="font-bold text-red-600">{formatPercentage(results.metrics.maxDrawdown)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tracking Error:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.trackingError)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Fee Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Fee Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Management Fees:</span>
                    <span className="font-bold text-red-600">{formatPercentage(results.metrics.managementFees)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Performance Fees:</span>
                    <span className="font-bold text-red-600">{formatPercentage(results.metrics.performanceFees)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Fees:</span>
                    <span className="font-bold text-red-600">{formatPercentage(results.metrics.totalFees)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Return:</span>
                    <span className={`font-bold ${results.metrics.netReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(results.metrics.netReturn)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee Impact:</span>
                    <span className="font-bold text-red-600">{formatPercentage(results.metrics.feeImpact)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Performance Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Performance Grade:</span>
                      <Badge variant={results.performanceAnalysis.performanceGrade === 'A' ? 'default' : 
                                     results.performanceAnalysis.performanceGrade === 'B' ? 'secondary' :
                                     results.performanceAnalysis.performanceGrade === 'C' ? 'outline' : 'destructive'}>
                        Grade {results.performanceAnalysis.performanceGrade}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level:</span>
                      <Badge variant={results.performanceAnalysis.riskLevel === 'low' ? 'default' : 
                                     results.performanceAnalysis.riskLevel === 'medium' ? 'secondary' : 'destructive'}>
                        {results.performanceAnalysis.riskLevel}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Strengths:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.performanceAnalysis.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Weaknesses:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.performanceAnalysis.weaknesses.map((weakness, index) => (
                        <li key={index}>{weakness}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Recommendations:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.performanceAnalysis.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Risk Score:</span>
                      <Badge variant={results.riskAnalysis.riskScore <= 3 ? 'default' : 
                                     results.riskAnalysis.riskScore <= 6 ? 'secondary' : 'destructive'}>
                        {results.riskAnalysis.riskScore}/10
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Category:</span>
                      <Badge variant={results.riskAnalysis.riskCategory === 'low' ? 'default' : 
                                     results.riskAnalysis.riskCategory === 'medium' ? 'secondary' : 'destructive'}>
                        {results.riskAnalysis.riskCategory}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Risk Factors:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.riskAnalysis.riskFactors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Risk Mitigation:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.riskAnalysis.riskMitigation.map((mitigation, index) => (
                        <li key={index}>{mitigation}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {results && (
            <div className="space-y-6">
              {/* Performance Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Metric</th>
                          <th className="text-right p-2">Fund</th>
                          <th className="text-right p-2">Benchmark</th>
                          <th className="text-right p-2">Market</th>
                          <th className="text-right p-2">Difference</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.performanceComparison.map((comparison, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{comparison.metric}</td>
                            <td className="text-right p-2">{formatPercentage(comparison.fundValue)}</td>
                            <td className="text-right p-2">{formatPercentage(comparison.benchmarkValue)}</td>
                            <td className="text-right p-2">{formatPercentage(comparison.marketValue)}</td>
                            <td className={`text-right p-2 font-bold ${comparison.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatPercentage(comparison.difference)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Risk Metrics Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.riskMetrics.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{metric.name}</span>
                          <span>{formatPercentage(metric.value)}</span>
                        </div>
                        <Progress value={Math.abs(metric.value)} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{formatPercentage(results.metrics.netReturn)}</div>
                      <div className="text-sm text-gray-600">Net Return</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{results.metrics.sharpeRatio.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">Sharpe Ratio</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{results.metrics.sortinoRatio.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">Sortino Ratio</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{results.metrics.calmarRatio.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">Calmar Ratio</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            Please fix the following errors:
            <ul className="list-disc list-inside mt-2">
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
            <ul className="list-disc list-inside mt-2">
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