const hasSubstring = (str, substr) => {
  return str.toLowerCase().indexOf(substr.toLowerCase()) !== -1;
};

export default hasSubstring;
