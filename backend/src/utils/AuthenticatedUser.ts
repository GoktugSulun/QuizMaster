class AuthenticatedUser {
   private static userId: string = "";

   public static setUserId(id: string) {
      console.log("setle => ", id);
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