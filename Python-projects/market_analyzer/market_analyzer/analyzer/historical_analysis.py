import pandas as pd
import numpy as np


"""
This module provides historical analysis
"""
class HistoricalAnalyzer:
    def __init__(self, portfolio: pd.DataFrame, historical_prices: pd.DataFrame):
        self.portfolio = portfolio.copy()
        self.historical_prices = historical_prices.copy()
        self.pnl_df = None


    def calculate_daily_pnl(self):
        """
        Calculate daily P&L for each trade using historical prices.
        PnL = (price_today - entry_price) * notional * trade_sign
        """

        df = self.portfolio.copy()
        df['trade_sign'] = df['transaction'].apply(lambda x: 1 if x == 'BUY' else -1)

        pnl_records = []

        for trade_id, row in df.iterrows():
            asset_prices = self.historical_prices[
                self.historical_prices['asset'] == row['asset']].sort_values('date')
            
            entry_price = row['price']
            
            for _, price_row in asset_prices.iterrows():
                daily_pnl = (price_row['price'] - entry_price) * row['notional'] * row['trade_sign']
                pnl_records.append({
                    'trade_id': row['trade_id'],
                    'asset': row['asset'],
                    'date': price_row['date'],
                    'daily_pnl': daily_pnl
                })

        self.pnl_df = pd.DataFrame(pnl_records)
        return self.pnl_df

    def calculate_historical_var(self, confidence_level: float=0.95):
        """
        Calculate Historical VaR per trade at a given confidence level.
        """

        if self.pnl_df is None:
            self.calculate_daily_pnl()

        var_df = self.pnl_df.groupby('trade_id')['daily_pnl'].quantile(1 - confidence_level).reset_index()
        var_df.rename(columns={'daily_pnl': 'historical_var'}, inplace=True)
        return var_df
