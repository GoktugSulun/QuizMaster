const shouldForwardProp = (prop: string) => !prop.startsWith('$');

export default shouldForwardProp;