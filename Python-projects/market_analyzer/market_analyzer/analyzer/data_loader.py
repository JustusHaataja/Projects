import pandas as pd

"""
This is a module for loading and validating trade data from a CSV file.
"""
class DataLoader:
    def __init__(self, file_path: str):
        self.file_path = file_path
        self.data = None

    
    def load_data(self) -> pd.DataFrame:
        """
        Load data from a CSV file into a pandas DataFrame.
        
        Returns:
            pd.DataFrame: Loaded data.
        """

        try:
            self.data = pd.read_csv(self.file_path)
            self._validate_data()
            return self.data
        
        except FileNotFoundError:
            raise Exception(f"File not found: {self.file_path}")
            return pd.DataFrame()
        
        except Exception as e:
            raise Exception(f"Error loading data: {e}")
            return pd.DataFrame()
        

    def _validate_data(self):
        """
        Basic validation on the loaded data.
        Cleans invalid or missing entries instead of raising exception.
        """
    
        required_columns = [
            "trade_id","asset_type","asset","currency",
            "notional","price","transaction"
        ]
        
        missing = [ col for col in required_columns if col not in self.data.columns ]
        if missing:
            raise ValueError(f"Missing required columns: {missing}")
        
        # Convert numeric columns
        self.data["notional"] = pd.to_numeric(self.data["notional"], errors="coerce")
        self.data["price"] = pd.to_numeric(self.data["price"], errors="coerce")
        
        # Drop rows with missing critical data
        self.data.dropna(
            subset=["trade_id", "asset", "notional", "price", "transaction"], 
            inplace=True
        )

        # Ensure transaction column is string
        self.data["transaction"] = self.data["transaction"].astype(str)

        # Standardize: remove whitespace and convert to uppercase
        self.data["transaction"] = self.data["transaction"].str.strip().str.upper()

        # Keep only valid BUY/SELL values
        valid_mask = self.data["transaction"].isin(["BUY", "SELL"])
        if not valid_mask.all():
            print("Dropping invalid transaction rows:")
            print(self.data[~valid_mask])
            self.data = self.data[valid_mask]
        
        # Drop duplicate trade_ids
        if self.data["trade_id"].duplicated().any():
            duplicates = self.data[self.data["trade_id"].duplicated(keep=False)]
            print(f"Dropping duplicate trade_ids:\n{duplicates}")
            self.data = self.data.drop_duplicates(subset=["trade_id"])
