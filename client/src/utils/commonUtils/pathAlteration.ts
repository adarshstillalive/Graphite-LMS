const pathAlteration = (pathname: string): string => {
  return pathname.replace(/^\/instructor/, '');
};

export default pathAlteration;
