class AuthenticatedUser {
   private static userId: string = "";

   public static setUserId(id: string) {
      this.userId = id;
   }

   public static getUserId(): string {
      return this.userId;
   }

   public static clear() {
      this.userId = "";
   }
}

export default AuthenticatedUser;