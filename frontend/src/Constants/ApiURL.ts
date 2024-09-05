export enum ApiURL {
   // Quiz
   QUIZ = "v1/quizzes",
   MARK_QUIZ_AS_FAVORITE = "v1/quizzes/markAsFavorite",
   UNMARK_QUIZ_AS_FAVORITE = "v1/quizzes/unmarkAsFavorite",
   MARK_QUIZ_AS_SAVED = "v1/quizzes/markAsSaved",
   UNMARK_QUIZ_AS_SAVED = "v1/quizzes/unmarkAsSaved",

   // Question
   QUESTION = "v1/questions",

   // QuizSession
   QUIZ_SESSION = "v1/quizSessions",
   START_QUIZ_SESSION = "v1/quizSessions/start",

   // QuizSession
   QUIZ_RESULTS = "v1/quizResults",
   ALL_QUIZ_RESULTS = "v1/quizResults/all",

   USER = "v1/user",

   // Auth
   AUTH = "v1/auth",
   AUTH_LOGIN = "v1/auth/login",
   AUTH_REGISTER = "v1/auth/register",
}