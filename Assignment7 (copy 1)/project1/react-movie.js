/*
This project requires the creation of multiple interconnected components. Figure 
11.20 illustrates what the finished version should look like along with the required 
component hierarchy. Changing any of the form fields on the right will update the 
movie display on the left. 

1. The starting of the components and their render() methods have been 
provided. The data is contained within the file movie-data.js. You can 
complete this project using the techniques covered in sections 11.2 and 11.3. 
You could instead use create-react-app as your starting point. 

2. Implement the rest of the MovieList, SingleMovie, and MovieLink
components. For MovieList, you will need to render a <SingleMovie> for each 
movie in the passed list of movies using map(). You will need to pass a movie 
object to SingleMovie. For SingleMovie, you will need to replace the sample 
data with data from the passed-in movie object. In the footer area, you will 
render a <MovieLink> and pass it the tmdbID property from the movie object. 
MovieLink must be a functional component. It will return markup similar to 
the following (though you will replace 1366 with the passed tmdbID value):
<a className="button card-footer-item" 
   href="https://www.themoviedb.org/movie/1366" >
        <img src="images/tmdb.svg" width="30" />
</a>
3. In the App component, you will add the <MovieList> component to the render. 
Be sure to pass it the list of movies in state. Test.
4. In the App component, use map() to output a <MovieForm> for each movie. Be 
sure to pass both index and key values to each MovieForm. Also pass the 
saveChanges method to each MovieForm. Test.
5. Make MovieForm a Controlled Form Component. This will require creating 
some type of handler method within MovieForm that will call the saveChanges
method that has been passed in (see also next step).
6. Implement saveChanges in the App component. Notice that it expects a movie 
object that contains within it the new data. Your method will use the index to 
replace the movie object from the movies data with the new data, and then 
update the state. Test. 
*/