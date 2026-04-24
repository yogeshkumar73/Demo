
// Fix: Added React import to define React namespace for React.ReactNode
import React from 'react';

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

export interface PortfolioItem {
  id: string;
  symbol: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}
