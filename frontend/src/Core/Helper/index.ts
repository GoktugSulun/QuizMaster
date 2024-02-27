export const isEmpty = (obj: {}) => {
   return Object.keys(obj).length === 0
}

export const getTimeOptions = () => {
   return Array
      .from({ length: 60 })
      .map((_, index) => {
         if (index < 10) {
            return { id: index, name: `0${index}` };
         }
         return { id: index, name: `${index}` };
      });
}