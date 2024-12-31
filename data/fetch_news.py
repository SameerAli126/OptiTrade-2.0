import json
from concurrent.futures import ThreadPoolExecutor
from finvizfinance.quote import finvizfinance
from tqdm import tqdm
import pandas as pd
import time

def load_tickers_from_json(file_path):
    """
    Load ticker symbols from a JSON file.

    Args:
        file_path (str): The path to the JSON file containing ticker data.

    Returns:
        list: A list of ticker symbols.
    """
    with open(file_path, 'r') as file:
        data = json.load(file)
    tickers = [ticker_info['symbol'] for ticker_info in data]
    return tickers

def get_news(ticker):
    """
    Fetch the news headlines for a given ticker symbol.

    Args:
        ticker (str): The ticker symbol for which to fetch news.

    Returns:
        pd.DataFrame: A DataFrame containing news headlines for the ticker.
    """
    print(f'Fetching headlines for {ticker}...')
    stock = finvizfinance(ticker)
    news_df = stock.ticker_news()
    return news_df

def fetch_headlines(ticker, retries=3, delay=5):
    """
    Fetch headlines for a ticker symbol with retries in case of failure.

    Args:
        ticker (str): The ticker symbol for which to fetch news.
        retries (int, optional): Number of retry attempts in case of failure. Default is 3.
        delay (int, optional): Delay (in seconds) between retries. Default is 5.

    Returns:
        None
    """
    attempt = 0
    while attempt < retries:
        try:
            news_dfs[ticker] = get_news(ticker)
            break
        except Exception as e:
            print(f"Error fetching headlines for {ticker}: {e}")
            attempt += 1
            if attempt < retries:
                print(f"Retrying {ticker}... (Attempt {attempt}/{retries})")
                time.sleep(delay)
            else:
                print(f"Failed to fetch headlines for {ticker} after {retries} attempts. Skipping...")

def fetch_news_for_all_tickers(tickers, max_workers=3):
    """
    Fetch news headlines for all tickers in parallel using threading.

    Args:
        tickers (list): A list of ticker symbols.
        max_workers (int, optional): Maximum number of worker threads. Default is 3.

    Returns:
        pd.DataFrame: A DataFrame containing news headlines for all tickers.
    """
    news_dfs = {}

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        with tqdm(total=len(tickers)) as pbar:
            futures = [executor.submit(fetch_headlines, ticker) for ticker in tickers]
            for future in futures:
                future.result()
                pbar.update(1)

    combined_df = pd.concat(
        [df.assign(Ticker=ticker) for ticker, df in news_dfs.items()],
        ignore_index=True
    )
    combined_df = combined_df[['Date', 'Ticker', 'Title', 'Link']]
    
    return combined_df

def save_to_json(df, file_path):
    """
    Save the DataFrame to a JSON file.

    Args:
        df (pd.DataFrame): The DataFrame to save.
        file_path (str): The path where to save the JSON file.

    Returns:
        None
    """
    df.to_json(file_path, orient='records')

def main():
    """
    The main function to orchestrate the entire workflow of fetching news headlines
    for a list of tickers and saving them to a JSON file.

    Returns:
        None
    """
    tickers = load_tickers_from_json('csvjson.json')
    print(tickers[:10])

    combined_df = fetch_news_for_all_tickers(tickers)

    missing_tickers = list(set(tickers) - set(list(combined_df['Ticker'].unique())))
    print(f"Missing tickers: {missing_tickers}")

    save_to_json(combined_df, 'news.json')
    print("News data saved to 'news.json'")

if __name__ == "__main__":
    main()
