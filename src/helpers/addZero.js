const addZero = (number) => {
  if(number < 10)
  {
    return `00${number}`;
  }
  else if(number >= 10 && number <= 99)
  {
    return `0${number}`;
  }

  return `${number}`;

};

export default addZero;