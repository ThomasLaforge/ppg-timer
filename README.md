# PPG Timer

## Goal

Yesterday, we used simple watch timers and wrote our training program on paper.
Now, we can use new world possibilities to make it smarter and easier to manage.

The solution we chose is to have an app 100% autonomous in internet connection, to be sure anywhere we go, it will work as "paper and watch" combo ^^ You'll still have the possibility to get some cloud bonus.

## Use cases
[x] - Create trainings easiest way but with maximum powers  
[x] - Execute trainings with smooth UI and less interaction needed.  
[x] - No useless pause on training  
[x] - Long training possible with multi loops and repetitions  
[x] - Share trainings with friends  
[ ] - Add or create exercises  

## Developement
### Publish
To publish, you have to set env GITHUB_TOKEN.
$env:GITHUB_TOKEN = 'my_token'

then:  
Get-ChildItem -Path Env:\  
to check it worked


## Data Model

You can see [definitions.ts](./src/definitions.ts) to have full informations.
We are only managing training objects.

### Training

``` typescript
{
    created_at: number,
    updated_at: number,
    note: number,
    data : { 
        defaultExerciseDuration: number,
        defaultExerciseRepetions: number,
        defaultExerciseRest: number,
        name: string
        loops: {
            repetitions: number,
            rest: number,
            warmup: number,
            exercises: {
                exerciseId: number,
                isDuration: boolean, // True = duration Else = Repetition
                value: number,
                rest: number
            }[]
        }[],
    }
}    
```
Training.data is the data who can be shared / imported. It's the minimum data we want to share now. So others informations are only user preferences. From this minimum amount of data we can execute a training.

Important thing to note: the only one dependancy we have are the exercises list.
Is there any solution ?
We could add local db for exercises and add exercises data on training object in place of exerciseId.
In the local db, anybody could add erxercises and when sharing trainings, users can execute training even if they don't own the exercises included.

## Updated TODO
- Previous / Skip exercise
- use default values on creator
## Technos

- [electron-forge + React + Typescript](https://dev.to/raphaelbadia/how-to-create-an-electron-forge-project-with-react-typescript-and-hmr-1gi3)
- [Sass for smart CSS](https://stackoverflow.com/questions/54814308/electron-forge-with-sass)
- electron-store to Store local data
- [Material UI for beauty v4.11](https://material-ui.com)
- Firebase + crypto-js to share trainings
- [DayJs to handle date data](https://day.js.org)
- [useSound to add some music and sound](https://use-sound.netlify.app/?path=/story/usesound--simple)