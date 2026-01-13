import pandas as pd


"""
This is module for calculating exposure from trade data.
"""
class ExposureCalculator:
    def __init__(self, portfolio: pd.DataFrame):
        self.portfolio = portfolio.copy()
        self.exposure_df = None

    
    def calculate_exposure(self) -> pd.DataFrame:
        """
        Calculate exposure per asset type and currency.
        Exposure = Notional x Price x trade_sign
        trade_sign = +1 for BUY / -1 for SELL

        Returns:
            pd.DataFrame: DataFrame with exposure per asset type and currency.
        """

        df = self.portfolio.copy()

        # Ensure transaction column is standardized
        df["trade_sign"] = df["transaction"].apply(
            lambda x: 1 if x.upper() == "BUY" else -1 )
        
        # Calculate exposure
        df["exposure"] = df["notional"] * df["price"] * df["trade_sign"]

        # Group by asset_type and currency
        self.exposure_df = df.groupby(["asset_type", "currency"])["exposure"].sum().reset_index()

        return self.exposure_df
    

    def total_exposure_by_currency(self) -> pd.DataFrame:
        """
        Aggregate total exposure per currency
        """

        if self.exposure_df is None:
            self.calculate_exposure()

        return self.exposure_df.groupby("currency")["exposure"].sum().reset_index()
    

    def total_exposure_by_asset_type(self) -> pd.DataFrame:
        """
        Aggregate total exposure per asset type
        """

        if self.exposure_df is None:
            self.calculate_exposure()

        return self.exposure_df.groupby("asset_type")["exposure"].sum().reset_index()