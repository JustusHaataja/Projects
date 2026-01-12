import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Load the data
movies = pd.read_csv('Data_project/movie_data/movies.csv')
ratings = pd.read_csv('Data_project/movie_data/ratings.csv')

# Merge the data
data = pd.merge(movies, ratings, on='movieId')


# Function to calculate top 10 best-rated movies
def top_25_movies(data, min_ratings=5 ,top_n=25):
    movie_stats = data.groupby('title').agg({'rating': ['mean', 'count']})
    movie_stats.columns = ['average_rating', 'rating_count']
    filtered_movies = movie_stats[movie_stats['rating_count'] > min_ratings]
    filtered_movies['average_rating'] = filtered_movies['average_rating'].round(2)
    top_movies = filtered_movies.sort_values('average_rating', ascending=False).head(top_n)
    return top_movies


# Function to calculate top 10 best-rated movies by genre
def top_in_genre(data, genre, min_raitings=5, top_n=10):
    # Filter movies that contain the selected genre
    genre_data = data[data['genres'].str.contains(genre, case=False, na=False)]
    
    # Group by title and calculate mean rating and rating count
    movie_stats = genre_data.groupby('title').agg({'rating': ['mean', 'count']})
    movie_stats.columns = ['average_rating', 'rating_count']
    
    # Filter movies that have more than the minimum number of ratings
    filtered_movies = movie_stats[movie_stats['rating_count'] > min_raitings]
    
    # Round the 'average_rating' column
    filtered_movies.loc[:, 'average_rating'] = filtered_movies['average_rating'].round(2)
    
    # Sort by average rating and return the top N movies
    top_movies = filtered_movies.sort_values('average_rating', ascending=False).head(top_n)
    return top_movies


# Function to get the genres
def get_genres(data):
    all_genres = set()
    for genre_list in data['genres']:
        all_genres.update(genre_list.split('|'))
    return sorted(all_genres)


# Function to calculate top 10 most rated movies
def top_most_rated(data, top_n=10):
    most_rated = data.groupby('title')['rating'].count().sort_values(ascending=False)
    top_most_rated = most_rated.head(top_n)
    return top_most_rated


# Visualize the top 10 best-rated movies
def visualize_top_movies(data, title):

    ax = data['average_rating'].plot(kind='barh', figsize=(10, 5), color='skyblue')
    plt.xlabel('Average rating')
    plt.ylabel('Movie title')
    plt.title(title)
    plt.gca().invert_yaxis()

    # Add the rating values on the bars
    for i, value in enumerate(data['average_rating']):
        ax.text(value + 0.02, i, f"{value:.2f}", va='center', fontsize=10)

    plt.show()


# Function to count movies each year
def top_years(data, top_n=10):
    movie_count = movies['title'].groupby(movies['title'].str.extract(r'\((\d{4})\)')[0]).count().sort_values(ascending=False)
    top_years = movie_count.head(top_n)
    return top_years


# Function to calculate top 25 best-rated movies from selected genres
def top_25_movies_by_genres(data, selected_genres, min_ratings=5, top_n=25):
    # Filter movies that contain at least one of the selected genres
    genre_filter = '|'.join(selected_genres)  # Join selected genres into a string
    genre_data = data[data['genres'].str.contains(genre_filter, case=False, na=False)]
    
    # Group by movie title and calculate average rating and rating count
    movie_stats = genre_data.groupby('title').agg({'rating': ['mean', 'count']})
    movie_stats.columns = ['average_rating', 'rating_count']
    
    # Filter out movies with less than the minimum number of ratings
    filtered_movies = movie_stats[movie_stats['rating_count'] > min_ratings]
    
    # Round the 'average_rating' column
    filtered_movies['average_rating'] = filtered_movies['average_rating'].round(2)
    
    # Sort by average rating and return top N movies
    top_movies = filtered_movies.sort_values('average_rating', ascending=False).head(top_n)
    return top_movies


# Main function
def main():
    while True:
        print("\nWhat would you like to do?")
        print("1. Movie recommendations to you by genre") 
        print("2. Print the top 25 best-rated movies")
        print("3. Print the top 10 best-rated movies in a specific genre")
        print("4. Print the top 10 most-rated movies")
        print("5. Visualize the top 10 best-rated movies")
        print("6. Visualize the top 10 best-rated movies in a specific genre")
        print("7. Print the top 10 years with most movies")
        print("8/Q. Exit")
        
        choice = input("\nEnter the number of your choice: ")
        all_genres = get_genres(data)


        if choice == '1':
            # Example interaction with the user
            print("\nAvailable genres:")
            for i, genre in enumerate(all_genres, start=1):
                print(f"{i}. {genre}")

            print("\nSelect your favorite genres by entering their numbers separated by commas (e.g., 1, 3, 7):")
            user_input = input("Your choice: ")

            # Convert input into a list of genre names
            try:
                selected_indices = [int(i.strip()) for i in user_input.split(',')]
                selected_genres = [all_genres[i - 1] for i in selected_indices if 1 <= i <= len(all_genres)]
            except ValueError:
                print("Invalid input. Please enter numbers separated by commas.")
                return

            if not selected_genres:
                print("No genres selected. Exiting the program.")
                return

            print(f"\nYou selected the following genres: {', '.join(selected_genres)}\n")

            # Call the function to get the top 25 movies for the selected genres
            top_movies = top_25_movies_by_genres(data, selected_genres)
            print(f"\nTop 25 best-rated movies for genres: {', '.join(selected_genres)}\n")
            print(top_movies[['average_rating', 'rating_count']])
            

        elif choice == '2':
            print("\nTop 25 best-rated movies:")
            print(top_25_movies(data))
        

        elif choice == '3':
            # Show the genres in sorted order
            print("\nAvailable genres:")
            for i, genre in enumerate(all_genres, start=1):
                print(f"{i}. {genre}")

            print("\nSelect a genre by entering its number:")
            user_input = input("Your choice: ")

            # Convert input into a genre name
            try:
                selected_index = int(user_input)
                selected_genre = all_genres[selected_index - 1] if 1 <= selected_index <= len(all_genres) else None
            except ValueError:
                print("Invalid input. Please enter a number between 1 and 20.")
                return

            if not selected_genre:
                print("No genre selected. Exiting the program.")
                return

            # Filter movies by the selected genre and display the top 10 best-rated movies
            print(f"\nTop 10 best-rated movies in genre: {selected_genre}\n")
            print(top_in_genre(data, selected_genre))
        

        elif choice == '4':
            print("\nTop 10 most-rated movies:")
            print(top_most_rated(data))
        

        elif choice == '5':
            visualize_top_movies(top_25_movies(data, 5, 10), 'Top 10 best-rated movies')
        

        elif choice == '6':
            # Show the genres in sorted order
            print("\nAvailable genres:")
            for i, genre in enumerate(all_genres, start=1):
                print(f"{i}. {genre}")

            print("\nSelect a genre by entering its number:")
            user_input = input("Your choice: ")

            # Convert input into a genre name
            try:
                selected_index = int(user_input)
                selected_genre = all_genres[selected_index - 1] if 1 <= selected_index <= len(all_genres) else None
            except ValueError:
                print("Invalid input. Please enter a number between 1 and 20.")
                return

            if not selected_genre:
                print("No genre selected. Exiting the program.")
                return

            # Filter movies by the selected genre and display the top 10 best-rated movies
            print(f"\nTop 10 best-rated movies in genre: {selected_genre}\n")
            visualize_top_movies(top_in_genre(data, selected_genre), f'Top 10 best-rated {selected_genre} movies')
        

        elif choice == '7':
            print("\nMovies by year:")
            print(top_years(data))


        elif choice == 'Q' or choice == 'q' or choice == '8':
            print("\nExiting the program. Goodbye!")
            break
        
        else:
            print("\nInvalid choice. Please enter a number between 1 and 6 or 7/Q to exit.")

if __name__ == "__main__":
    main()
