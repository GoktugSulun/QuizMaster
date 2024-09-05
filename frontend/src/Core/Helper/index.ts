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

export const formatDateTime = (date: Date) => {
   const days = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"];
   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

   const day = days[date.getDate() - 1];
   const month = months[date.getMonth()];
   const year = date.getFullYear();

   let hours = date.getHours();
   const minutes = date.getMinutes();
   const ampm = hours >= 12 ? 'PM' : 'AM';
   hours = hours % 12;
   hours = hours ? hours : 12;
   const strMinutes = minutes < 10 ? '0' + minutes : minutes;

   return {
      date: `${day} ${month} ${year}`,
      time: `${hours}:${strMinutes} ${ampm}`
   }
}

//* date format => 2024-07-28T16:16:22.027Z
export const formatDate = (date: string, format: '-' | '.' | '/' = '/') => {
   const datePiece = date?.split?.('T')?.[0];
   const formattedDate = datePiece?.split?.('-')?.reverse?.()?.join?.(format);
   return formattedDate;
}