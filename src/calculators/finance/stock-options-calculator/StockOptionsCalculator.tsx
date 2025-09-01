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
import { StockOptionsInputs, StockOptionsOutputs } from './types';
import { calculateStockOptions } from './formulas';
import { validateStockOptionsInputs } from './validation';
import { validateField } from './quickValidation';

export default function StockOptionsCalculator() {
  const [inputs, setInputs] = useState<StockOptionsInputs>({
    // Option Details
    optionType: 'call',
    stockPrice: 100,
    strikePrice: 100,
    timeToExpiration: 30,
    volatility: 25,
    riskFreeRate: 2.5,
    dividendYield: 0,

    // Position Information
    quantity: 1,
    premium: 5,
    currentMarketPrice: 5,

    // Greeks and Risk
    delta: 0.5,
    gamma: 0.02,
    theta: -0.05,
    vega: 0.15,
    rho: 0.01,

    // Market Conditions
    marketTrend: 'neutral',
    impliedVolatility: 25,
    volume: 1000,
    openInterest: 500,

    // Analysis Parameters
    analysisPeriod: 30,
    confidenceLevel: 95,
    monteCarloSamples: 10000,

    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    includeProjections: true
  });

  const [results, setResults] = useState<StockOptionsOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = validateStockOptionsInputs(inputs);
    if (validation.isValid) {
      try {
        const calculatedResults = calculateStockOptions(inputs);
        setResults(calculatedResults);
        setErrors({});
      } catch (error) {
        setErrors({ calculation: 'Error calculating options metrics' });
      }
    } else {
      setErrors(validation.errors || {});
    }
  }, [inputs]);

  const handleInputChange = (field: keyof StockOptionsInputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);

    // Auto-calculate related fields
    if (field === 'currentMarketPrice' && inputs.premium > 0) {
      const unrealizedPnL = (value - inputs.premium) * inputs.quantity * 100;
      newInputs.unrealizedPnL = unrealizedPnL;
    }

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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
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
        <h1 className="text-3xl font-bold">Stock Options Calculator</h1>
        <p className="text-muted-foreground">
          Analyze options strategies, calculate Greeks, and assess risk
        </p>
      </div>

      <Tabs defaultValue="inputs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Option Details */}
            <Card>
              <CardHeader>
                <CardTitle>Option Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="optionType">Option Type</Label>
                  <Select value={inputs.optionType} onValueChange={(value) => handleInputChange('optionType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Call</SelectItem>
                      <SelectItem value="put">Put</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stockPrice">Stock Price</Label>
                  <Input
                    id="stockPrice"
                    type="number"
                    step="0.01"
                    value={inputs.stockPrice}
                    onChange={(e) => handleInputChange('stockPrice', parseFloat(e.target.value) || 0)}
                    className={errors.stockPrice ? 'border-red-500' : ''}
                  />
                  {errors.stockPrice && <p className="text-sm text-red-500">{errors.stockPrice}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="strikePrice">Strike Price</Label>
                  <Input
                    id="strikePrice"
                    type="number"
                    step="0.01"
                    value={inputs.strikePrice}
                    onChange={(e) => handleInputChange('strikePrice', parseFloat(e.target.value) || 0)}
                    className={errors.strikePrice ? 'border-red-500' : ''}
                  />
                  {errors.strikePrice && <p className="text-sm text-red-500">{errors.strikePrice}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeToExpiration">Days to Expiration</Label>
                  <Input
                    id="timeToExpiration"
                    type="number"
                    value={inputs.timeToExpiration}
                    onChange={(e) => handleInputChange('timeToExpiration', parseInt(e.target.value) || 0)}
                    className={errors.timeToExpiration ? 'border-red-500' : ''}
                  />
                  {errors.timeToExpiration && <p className="text-sm text-red-500">{errors.timeToExpiration}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volatility">Volatility (%)</Label>
                  <Input
                    id="volatility"
                    type="number"
                    step="0.1"
                    value={inputs.volatility}
                    onChange={(e) => handleInputChange('volatility', parseFloat(e.target.value) || 0)}
                    className={errors.volatility ? 'border-red-500' : ''}
                  />
                  {errors.volatility && <p className="text-sm text-red-500">{errors.volatility}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Position Information */}
            <Card>
              <CardHeader>
                <CardTitle>Position Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (Contracts)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={inputs.quantity}
                    onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                    className={errors.quantity ? 'border-red-500' : ''}
                  />
                  {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="premium">Premium Paid</Label>
                  <Input
                    id="premium"
                    type="number"
                    step="0.01"
                    value={inputs.premium}
                    onChange={(e) => handleInputChange('premium', parseFloat(e.target.value) || 0)}
                    className={errors.premium ? 'border-red-500' : ''}
                  />
                  {errors.premium && <p className="text-sm text-red-500">{errors.premium}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentMarketPrice">Current Market Price</Label>
                  <Input
                    id="currentMarketPrice"
                    type="number"
                    step="0.01"
                    value={inputs.currentMarketPrice}
                    onChange={(e) => handleInputChange('currentMarketPrice', parseFloat(e.target.value) || 0)}
                    className={errors.currentMarketPrice ? 'border-red-500' : ''}
                  />
                  {errors.currentMarketPrice && <p className="text-sm text-red-500">{errors.currentMarketPrice}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskFreeRate">Risk-Free Rate (%)</Label>
                  <Input
                    id="riskFreeRate"
                    type="number"
                    step="0.1"
                    value={inputs.riskFreeRate}
                    onChange={(e) => handleInputChange('riskFreeRate', parseFloat(e.target.value) || 0)}
                    className={errors.riskFreeRate ? 'border-red-500' : ''}
                  />
                  {errors.riskFreeRate && <p className="text-sm text-red-500">{errors.riskFreeRate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dividendYield">Dividend Yield (%)</Label>
                  <Input
                    id="dividendYield"
                    type="number"
                    step="0.1"
                    value={inputs.dividendYield}
                    onChange={(e) => handleInputChange('dividendYield', parseFloat(e.target.value) || 0)}
                    className={errors.dividendYield ? 'border-red-500' : ''}
                  />
                  {errors.dividendYield && <p className="text-sm text-red-500">{errors.dividendYield}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Greeks and Risk */}
            <Card>
              <CardHeader>
                <CardTitle>Greeks and Risk</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="delta">Delta</Label>
                  <Input
                    id="delta"
                    type="number"
                    step="0.01"
                    value={inputs.delta}
                    onChange={(e) => handleInputChange('delta', parseFloat(e.target.value) || 0)}
                    className={errors.delta ? 'border-red-500' : ''}
                  />
                  {errors.delta && <p className="text-sm text-red-500">{errors.delta}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gamma">Gamma</Label>
                  <Input
                    id="gamma"
                    type="number"
                    step="0.001"
                    value={inputs.gamma}
                    onChange={(e) => handleInputChange('gamma', parseFloat(e.target.value) || 0)}
                    className={errors.gamma ? 'border-red-500' : ''}
                  />
                  {errors.gamma && <p className="text-sm text-red-500">{errors.gamma}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theta">Theta</Label>
                  <Input
                    id="theta"
                    type="number"
                    step="0.01"
                    value={inputs.theta}
                    onChange={(e) => handleInputChange('theta', parseFloat(e.target.value) || 0)}
                    className={errors.theta ? 'border-red-500' : ''}
                  />
                  {errors.theta && <p className="text-sm text-red-500">{errors.theta}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vega">Vega</Label>
                  <Input
                    id="vega"
                    type="number"
                    step="0.01"
                    value={inputs.vega}
                    onChange={(e) => handleInputChange('vega', parseFloat(e.target.value) || 0)}
                    className={errors.vega ? 'border-red-500' : ''}
                  />
                  {errors.vega && <p className="text-sm text-red-500">{errors.vega}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rho">Rho</Label>
                  <Input
                    id="rho"
                    type="number"
                    step="0.001"
                    value={inputs.rho}
                    onChange={(e) => handleInputChange('rho', parseFloat(e.target.value) || 0)}
                    className={errors.rho ? 'border-red-500' : ''}
                  />
                  {errors.rho && <p className="text-sm text-red-500">{errors.rho}</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Option Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Option Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Intrinsic Value:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.intrinsicValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Value:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.timeValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unrealized P&L:</span>
                    <span className={`font-bold ${results.metrics.unrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(results.metrics.unrealizedPnL)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>P&L %:</span>
                    <span className={`font-bold ${results.metrics.pnlPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(results.metrics.pnlPercentage)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Break-Even Price:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.breakEvenPrice)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Greeks Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Greeks Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Delta:</span>
                    <span className="font-bold">{results.metrics.delta.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gamma:</span>
                    <span className="font-bold">{results.metrics.gamma.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Theta:</span>
                    <span className="font-bold">{results.metrics.theta.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vega:</span>
                    <span className="font-bold">{results.metrics.vega.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rho:</span>
                    <span className="font-bold">{results.metrics.rho.toFixed(4)}</span>
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
                    <span>Position Risk:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.positionRisk)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Account Risk:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.accountRisk)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk-Reward Ratio:</span>
                    <span className="font-bold">{results.metrics.riskRewardRatio.toFixed(2)}:1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Probability of Profit:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.probabilityOfProfit * 100)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Days to Expiration:</span>
                    <span className="font-bold">{results.metrics.daysToExpiration}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trading Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Trading Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Trading Recommendation:</span>
                      <Badge variant={results.tradingAnalysis.recommendation === 'buy' ? 'default' :
                                     results.tradingAnalysis.recommendation === 'hold' ? 'secondary' : 'destructive'}>
                        {results.tradingAnalysis.recommendation.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence Level:</span>
                      <Badge variant={results.tradingAnalysis.confidenceLevel >= 7 ? 'default' :
                                     results.tradingAnalysis.confidenceLevel >= 4 ? 'secondary' : 'destructive'}>
                        {results.tradingAnalysis.confidenceLevel}/10
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Factors:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.tradingAnalysis.keyFactors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Risks:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.tradingAnalysis.risks.map((risk, index) => (
                        <li key={index}>{risk}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Opportunities:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.tradingAnalysis.opportunities.map((opportunity, index) => (
                        <li key={index}>{opportunity}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Market Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Market Position:</span>
                      <Badge variant={results.marketAnalysis.marketPosition === 'bullish' ? 'default' :
                                     results.marketAnalysis.marketPosition === 'neutral' ? 'secondary' : 'destructive'}>
                        {results.marketAnalysis.marketPosition}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Risk:</span>
                      <Badge variant={results.marketAnalysis.marketRisk === 'low' ? 'default' :
                                     results.marketAnalysis.marketRisk === 'medium' ? 'secondary' : 'destructive'}>
                        {results.marketAnalysis.marketRisk}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Market Factors:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.marketAnalysis.marketFactors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Market Outlook:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.marketAnalysis.marketOutlook.map((outlook, index) => (
                        <li key={index}>{outlook}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trading" className="space-y-6">
          {results && (
            <div className="space-y-6">
              {/* Trading Strategies */}
              <Card>
                <CardHeader>
                  <CardTitle>Trading Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Strategy</th>
                          <th className="text-right p-2">Entry Price</th>
                          <th className="text-right p-2">Exit Price</th>
                          <th className="text-right p-2">Profit/Loss</th>
                          <th className="text-right p-2">Risk Level</th>
                          <th className="text-right p-2">Time Horizon</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.tradingStrategies.map((strategy, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{strategy.name}</td>
                            <td className="text-right p-2">{formatCurrency(strategy.entryPrice)}</td>
                            <td className="text-right p-2">{formatCurrency(strategy.exitPrice)}</td>
                            <td className={`text-right p-2 font-bold ${strategy.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(strategy.profitLoss)}
                            </td>
                            <td className="text-right p-2">
                              <Badge variant={strategy.riskLevel === 'low' ? 'default' :
                                            strategy.riskLevel === 'medium' ? 'secondary' : 'destructive'}>
                                {strategy.riskLevel}
                              </Badge>
                            </td>
                            <td className="text-right p-2">{strategy.timeHorizon}</td>
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
                      <div className="text-2xl font-bold text-green-600">{formatCurrency(results.metrics.unrealizedPnL)}</div>
                      <div className="text-sm text-gray-600">Unrealized P&L</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{formatPercentage(results.metrics.pnlPercentage)}</div>
                      <div className="text-sm text-gray-600">P&L %</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{results.metrics.riskRewardRatio.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">Risk-Reward</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{formatPercentage(results.metrics.probabilityOfProfit * 100)}</div>
                      <div className="text-sm text-gray-600">Profit Probability</div>
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