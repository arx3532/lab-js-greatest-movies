// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.

const movies = require("./data");

// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map(item => item['director'])
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const count= moviesArray.filter(item => item['director']==='Steven Spielberg' && item['genre'].includes('Drama'))
  return count.length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length !== 0){
  const avg=moviesArray.reduce(function(sum,item){
  if (item.score){
    return sum+ item.score;
  }
  else
    return sum;
  },0);
  return parseFloat((avg/moviesArray.length).toFixed(2));
  }
  else
    return 0;

}
// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  return scoresAverage(moviesArray.filter(item => item.genre.includes('Drama')));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  let newArr;
  if (moviesArray.length > 1){
  newArr = moviesArray.sort(function(a,b){
    if (a.year !== b.year){
      return a.year - b.year;
    }
    else 
      return a['title'].toLowerCase() > b['title'].toLowerCase() ? 1:-1;});
  }
  else{
  newArr = [...moviesArray];
  }
  return newArr;}

 

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  var newArr=JSON.parse(JSON.stringify(moviesArray));
  if (moviesArray.length < 20){
    return newArr.map(item => item['title']).sort();
  }
  else{
    return newArr.map(item => item['title']).sort().slice(0,20);
  }
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  var newArr = JSON.parse(JSON.stringify(moviesArray));
  for (let i in newArr){
  let hr = parseInt(newArr[i].duration.match(/(\d+)h/)?.[1] || 0);
  let min = parseInt(newArr[i].duration.match(/(\d+)min/)?.[1] || 0);
  newArr[i].duration = (hr*60)+ min;
}
  return newArr;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length !== 0) {
    let bestYear = null;
    let bestAvg = 0;

    // Get all unique years
    const years = [...new Set(moviesArray.map(movie => movie.year))];

    // Loop through each year
    for (let year of years) {
      // Get all movies of the current year
      let moviesOfYear = moviesArray.filter(movie => movie.year === year);
      let totalScore = 0;

      // Sum the scores for the year
      for (let movie of moviesOfYear) {
        totalScore += movie.score;
      }

      // Calculate average score for the current year
      let avgScore = totalScore / moviesOfYear.length;

      // Update best year if the average is higher
      if (avgScore > bestAvg) {
        bestAvg = avgScore;
        bestYear = year;
      } else if (avgScore === bestAvg && year < bestYear) {
        // If averages are the same, pick the earlier year
        bestYear = year;
      }
    }

    return `The best year was ${bestYear} with an average score of ${bestAvg}`;
  } else {
    return null;
  }
}

  
  

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
