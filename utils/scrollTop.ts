const isWindow = () => typeof window !== 'undefined';

const scrollTop = () =>
  isWindow() && window.scrollTo({ top: 0, behavior: 'smooth' });

export default scrollTop;
