const exclSpChar = (e: any) => {
  const reg = RegExp(/^[a-zA-Z0-9\s]*$/);
  if (!reg.test(e.key) && e.key !== 'Backspace') {
    e.preventDefault();
  }
};

const phoneNum = (e: any) => {
  const reg = RegExp(/^[0-9\b+\-.]+$/);
  if (!reg.test(e.key) && e.key !== 'Backspace') {
    e.preventDefault();
  }
};

export { exclSpChar, phoneNum };
