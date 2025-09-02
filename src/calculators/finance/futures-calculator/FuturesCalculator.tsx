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
import { FuturesInputs, FuturesOutputs } from './types';
import { calculateFutures } from './formulas';
import { validateFuturesInputs } from './validation';
import { validateField } from './quickValidation';

export default function FuturesCalculator() {
  const [inputs, setInputs] = useState<FuturesInputs>({
    // Contract Information
    contractName: '',
    contractType: 'commodity',
    underlyingAsset: '',
    contractSize: 1000,
    tickSize: 0.01,
    tickValue: 10,
    contractMonth: '',
    expirationDate: '',
    
    // Price Information
    currentPrice: 100,
    bidPrice: 99.5,
    askPrice: 100.5,
    lastPrice: 100,
    openInterest: 10000,
    volume: 5000,
    
    // Position Information
    positionType: 'long',
    quantity: 1,
    entryPrice: 100,
    currentMarketPrice: 100,
    
    // Margin and Leverage
    initialMargin: 5000,
    maintenanceMargin: 4000,
    leverage: 20,
    accountBalance: 100000,
    
    // Risk Management
    stopLossPrice: 95,
    takeProfitPrice: 110,
    maxLoss: 5000,
    riskPerTrade: 2,
    
    // Market Data
    volatility: 25,
    correlation: 0.5,
    beta: 1.0,
    marketTrend: 'bullish',
    
    // Analysis Parameters
    analysisPeriod: 30,
    riskFreeRate: 2.5,
    dividendYield: 0,
    
    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    includeProjections: true
  });

  const [results, setResults] = useState<FuturesOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = validateFuturesInputs(inputs);
    if (validation.isValid) {
      try {
        const calculatedResults = calculateFutures(inputs);
        setResults(calculatedResults);
        setErrors({});
      } catch (error) {
        setErrors({ calculation: 'Error calculating futures metrics' });
      }
    } else {
      setErrors(validation.errors || {});
    }
  }, [inputs]);

  const handleInputChange = (field: keyof FuturesInputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);

    // Auto-calculate related fields
    if (field === 'currentMarketPrice' && inputs.entryPrice > 0) {
      const unrealizedPnL = (value - inputs.entryPrice) * inputs.quantity * inputs.contractSize;
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
        <h1 className="text-3xl font-bold">Futures Calculator</h1>
        <p className="text-muted-foreground">
          Analyze futures contracts, calculate margins, and assess risk
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
            {/* Contract Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contract Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contractName">Contract Name</Label>
                  <Input
                    id="contractName"
                    value={inputs.contractName}
                    onChange={(e) => handleInputChange('contractName', e.target.value)}
                    className={errors.contractName ? 'border-red-500' : ''}
                  />
                  {errors.contractName && <p className="text-sm text-red-500">{errors.contractName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contractType">Contract Type</Label>
                  <Select value={inputs.contractType} onValueChange={(value) => handleInputChange('contractType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commodity">Commodity</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="currency">Currency</SelectItem>
                      <SelectItem value="index">Index</SelectItem>
                      <SelectItem value="energy">Energy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contractSize">Contract Size</Label>
                  <Input
                    id="contractSize"
                    type="number"
                    value={inputs.contractSize}
                    onChange={(e) => handleInputChange('contractSize', parseFloat(e.target.value) || 0)}
                    className={errors.contractSize ? 'border-red-500' : ''}
                  />
                  {errors.contractSize && <p className="text-sm text-red-500">{errors.contractSize}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tickSize">Tick Size</Label>
                  <Input
                    id="tickSize"
                    type="number"
                    step="0.001"
                    value={inputs.tickSize}
                    onChange={(e) => handleInputChange('tickSize', parseFloat(e.target.value) || 0)}
                    className={errors.tickSize ? 'border-red-500' : ''}
                  />
                  {errors.tickSize && <p className="text-sm text-red-500">{errors.tickSize}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tickValue">Tick Value</Label>
                  <Input
                    id="tickValue"
                    type="number"
                    step="0.01"
                    value={inputs.tickValue}
                    onChange={(e) => handleInputChange('tickValue', parseFloat(e.target.value) || 0)}
                    className={errors.tickValue ? 'border-red-500' : ''}
                  />
                  {errors.tickValue && <p className="text-sm text-red-500">{errors.tickValue}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Price Information */}
            <Card>
              <CardHeader>
                <CardTitle>Price Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPrice">Current Price</Label>
                  <Input
                    id="currentPrice"
                    type="number"
                    step="0.01"
                    value={inputs.currentPrice}
                    onChange={(e) => handleInputChange('currentPrice', parseFloat(e.target.value) || 0)}
                    className={errors.currentPrice ? 'border-red-500' : ''}
                  />
                  {errors.currentPrice && <p className="text-sm text-red-500">{errors.currentPrice}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bidPrice">Bid Price</Label>
                  <Input
                    id="bidPrice"
                    type="number"
                    step="0.01"
                    value={inputs.bidPrice}
                    onChange={(e) => handleInputChange('bidPrice', parseFloat(e.target.value) || 0)}
                    className={errors.bidPrice ? 'border-red-500' : ''}
                  />
                  {errors.bidPrice && <p className="text-sm text-red-500">{errors.bidPrice}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="askPrice">Ask Price</Label>
                  <Input
                    id="askPrice"
                    type="number"
                    step="0.01"
                    value={inputs.askPrice}
                    onChange={(e) => handleInputChange('askPrice', parseFloat(e.target.value) || 0)}
                    className={errors.askPrice ? 'border-red-500' : ''}
                  />
                  {errors.askPrice && <p className="text-sm text-red-500">{errors.askPrice}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="openInterest">Open Interest</Label>
                  <Input
                    id="openInterest"
                    type="number"
                    value={inputs.openInterest}
                    onChange={(e) => handleInputChange('openInterest', parseInt(e.target.value) || 0)}
                    className={errors.openInterest ? 'border-red-500' : ''}
                  />
                  {errors.openInterest && <p className="text-sm text-red-500">{errors.openInterest}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volume">Volume</Label>
                  <Input
                    id="volume"
                    type="number"
                    value={inputs.volume}
                    onChange={(e) => handleInputChange('volume', parseInt(e.target.value) || 0)}
                    className={errors.volume ? 'border-red-500' : ''}
                  />
                  {errors.volume && <p className="text-sm text-red-500">{errors.volume}</p>}
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
                  <Label htmlFor="positionType">Position Type</Label>
                  <Select value={inputs.positionType} onValueChange={(value) => handleInputChange('positionType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="long">Long</SelectItem>
                      <SelectItem value="short">Short</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
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
                  <Label htmlFor="entryPrice">Entry Price</Label>
                  <Input
                    id="entryPrice"
                    type="number"
                    step="0.01"
                    value={inputs.entryPrice}
                    onChange={(e) => handleInputChange('entryPrice', parseFloat(e.target.value) || 0)}
                    className={errors.entryPrice ? 'border-red-500' : ''}
                  />
                  {errors.entryPrice && <p className="text-sm text-red-500">{errors.entryPrice}</p>}
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Position Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Position Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <span>Margin Used:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.marginUsed)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Free Margin:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.freeMargin)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Margin Level:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.marginLevel)}</span>
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
                    <span>Break-Even Price:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.breakEvenPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Days to Expiration:</span>
                    <span className="font-bold">{results.metrics.daysToExpiration}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Market Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Volatility:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.volatility)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Beta:</span>
                    <span className="font-bold">{results.metrics.beta.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Correlation:</span>
                    <span className="font-bold">{results.metrics.correlation.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sharpe Ratio:</span>
                    <span className="font-bold">{results.metrics.sharpeRatio.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sortino Ratio:</span>
                    <span className="font-bold">{results.metrics.sortinoRatio.toFixed(2)}</span>
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
                      <div className="text-2xl font-bold text-orange-600">{formatPercentage(results.metrics.marginLevel)}</div>
                      <div className="text-sm text-gray-600">Margin Level</div>
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