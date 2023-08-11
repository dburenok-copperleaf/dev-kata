# Dev Kata Day 2023
TypeScript-based starter repo for Dev Kata Day 2023.
### Instructions
* To participate in this challenge, clone this repo to your local computer (or clone with a tool like StackBlitz).
* Navigate to the root of the cloned repo and run `npm install` to install dependencies.
* Add your team name in `kata.ts` by changing `TEAM_NAME`.
* Try running the local tests with `npm run test`, which should produce a console log with some feedback about your solution.
  * You can run local tests as many times as you like.
* Think about how you might design a solution, and implement it by updating the `compress` and `decompress` functions in `kata.ts`.
* Once you are ready to submit, give you algorithm a name by changing `ALGORITHM_NAME` in `kata.ts`.
* Run `npm run submit` to submit you algorithm, but only when you are ready to share results with other teams.
* Results will be displayed in real-time on the Dev Kata Dashboard: https://dev-kata-dashboard.web.app/
### Using a different language
If you would like to use a language other than TypeScript while taking part in this challenge, you are more than welcome to do so. The Dev Kata Day API consists of 2 endpoints:
* GetTestStrings (`GET` `https://getteststrings-qfyyyjacqa-uc.a.run.app/`) which serves the strings used to evaluate the submissions, and
* SubmitResult (`POST` `https://getresults-qfyyyjacqa-uc.a.run.app/`) which accepts submissions of the type described in `src/types/submission-result.type.ts`
Since you are using a different language, you will have to perform the evaluation of you algorithm yourself. The `submit` method in `src/submit.ts` implements a simple testing suite that you are free to replicate.
