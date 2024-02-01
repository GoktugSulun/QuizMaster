export const overridedProps = {
   shouldForwardProp: (prop) => !prop.startsWith('$')
};
 
export const isEmpty = (obj: {}) => {
   return Object.keys(obj).length === 0
}