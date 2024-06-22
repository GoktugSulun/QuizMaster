export enum QuestionEnums {
   MULTIPLE_CHOICE = 'Multiple Choice',
   TRUE_FALSE = 'True/False',
   SHORT_ANSWER = 'Short Answer'
}

export enum VisibilityEnums {
   PRIVATE = 'Private',
   PUBLIC = 'Public',
}

export enum PointEnums {
   STANDART = 'Standart',
   DOUBLE_UP = 'Double Up',
}

export enum QuizTypeEnums {
   ALL = 'all',
   FAVORITES = 'favorites',
   SAVED = 'saved',
   COMPLETED = 'completed',
   CREATED = 'created'
}

export enum CorrectOptionEnums {
   SINGLE_OPTION = 'Single Option',
   MULTIPLE_OPTIONS = 'Multiple Options',
}

export enum QuizSessionEnums {
   STARTED = 'Started',
   COMPLETED = 'Completed',
   TIMEOUT = 'Timeout',
   EXCEED_ATTEMPT = 'Exceed Attempt'
}

export enum QuizSessionEndEnums {
   COMPLETED = 'Completed',
   TIMEOUT = 'Timeout',
   EXCEED_ATTEMPT = 'Exceed Attempt'
}

export enum QuizStatusEnums {
   START_NEW_QUIZ = 'Start New Quiz',
   CONTINUE_STARTED_QUIZ = 'Continue Started Quiz',
   TIMEOUT = 'Timeout',
   EXCEED_ATTEMPT = 'Exceed Attempt'
}