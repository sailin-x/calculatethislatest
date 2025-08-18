import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, X, Calculator as CalculatorIcon } from 'lucide-react';
import { Calculator } from '../../types/calculator';
import { calculatorRegistry } from '../../data/calculatorRegistry';
import { getCategoryColor, getCategoryTitle } from '../../constants/categories';

interface SearchBarProps {
  onCalculatorSelect: (calculatorId: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ 
  onCalculatorSelect, 
  placeholder = "Search calculators...", 
  className 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Calculator[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search functionality
  useEffect(() => {
    if (query.trim().length > 0) {
      const searchResults = calculatorRegistry.searchCalculators(query);
      setResults(searchResults.slice(0, 8)); // Limit to 8 results
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [query]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleCalculatorSelect(results[selectedIndex].id);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleCalculatorSelect = (calculatorId: string) => {
    onCalculatorSelect(calculatorId);
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const highlightMatch = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-0.5 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto shadow-lg">
          <CardContent className="p-0">
            {results.length > 0 ? (
              <div className="py-2">
                {results.map((calculator, index) => {
                  const categoryColor = getCategoryColor(calculator.category);
                  const categoryTitle = getCategoryTitle(calculator.category);
                  
                  return (
                    <div
                      key={calculator.id}
                      className={`px-4 py-3 cursor-pointer transition-colors ${
                        index === selectedIndex 
                          ? 'bg-primary/10 border-l-2 border-primary' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleCalculatorSelect(calculator.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded ${categoryColor} text-white flex-shrink-0`}>
                          <CalculatorIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate">
                              {highlightMatch(calculator.title, query)}
                            </h4>
                            <Badge variant="outline" className="text-xs flex-shrink-0">
                              {categoryTitle}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {highlightMatch(calculator.description, query)}
                          </p>
                          {calculator.subcategory && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              {calculator.subcategory}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : query.trim() && (
              <div className="px-4 py-8 text-center">
                <CalculatorIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No calculators found for "{query}"
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try searching for terms like "mortgage", "investment", or "health"
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}