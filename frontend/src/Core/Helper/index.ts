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

//* Format seconds to { minute: { id: 1, name: "1" }, second: { id: 2, name: "2" } }
export const formatTime = (time: number) => {
   const minute = Math.trunc(time / 60);
   const second = time % 60;
   const formattedMinute = minute < 10 ? `0${minute}` : minute;
   const formattedSecond = second < 10 ? `0${second}` : second;

   return { 
      minute: { id: minute, name: `${formattedMinute}` },
      second: { id: second, name: `${formattedSecond}` }
   }
}