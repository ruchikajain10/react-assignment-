# Fiit Workout Results Pair Programming Task

## Setup

```
yarn && (cd client && yarn)
```


## Running

```
yarn dev
```

## Tests

```
yarn test
```

## Background

At Fiit we collect stats for user workouts, we then present these stats to our users in meaningful ways.
The aim of this task is to present a styled list of workouts with associated stats.

## Tasks

### Full stack

1. Make the `workouts.js` api return results from the workout.json file
2. Display drop down list of workouts returned in the UI instead of always first workout
3. Hook up stats api with workoutId to fetch stats for the workout
4. Implement stats api to calculate average heart rate and total reps from the json data
5. If the stats fail to load in under 2 seconds, return an error instead (workout #5 looks particularly slow)
6. Style the results page to make it look nicer

### Frontend

1. Display drop down list of workouts returned in the UI instead of always first workout
2. Add and extend the existing Stats component to the page. When a workout is selected from the drop down list: load the stats for that workout and display them. Some hard coded stats are returned from GraphQL which will suffice for this step.
3. Show the image for the selected workout so that it is centered in a square on all screen sizes - design.png
4. Hook up the rest of the workouts and randomise the stats in GraphQL - if comfortable attempt to load the json data from the files.
5. On changing the selected workout, add some kind of animation or fade transition between the old details and new ones
6. Talk through breaking up the files / managing this state appropriately in production

## Followup questions

1. What could be improved with the solution?
2. What tests did you write and why? What other tests are needed?

### Awesome :100: design
![design](/design.png)
