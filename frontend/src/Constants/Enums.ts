export enum RouteEnums {
   // Display Quizzes
   DEFAULT = '/',
   FEED = '/feed',
   FAVORITES = '/favorites',
   SAVED = '/saved',
   COMPLETED = '/completed',
   CREATED = '/created',

   // Solving quiz
   QUIZ = '/quiz',
   QUIZ_RULES = '/rules/quiz', // TODO : query ile yönetiliyordu bunu belki param ile yapabiliriz
   QUIZ_RESULTS = '/results/quiz', // TODO : query ile yönetiliyordu bunu belki param ile yapabiliriz

   // Create Quiz
   CREATOR = '/creator/:quizId?',

   // Auth
   LOGIN = '/login',
   REGISTER = '/register',

   // Test route
   TEST = '/test',
}

export enum QuizTypeEnums {
   ALL = 'all',
   FAVORITES = 'favorites',
   SAVED = 'saved',
   COMPLETED = 'completed',
   CREATED = 'created'
}