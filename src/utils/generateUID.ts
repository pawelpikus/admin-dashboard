export const generateUID = (): number => {
  let uid = Math.floor(Math.random() * 100);
  return uid;
};
