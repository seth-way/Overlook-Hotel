const baseURL = 'https://images.pexels.com/photos/';
const urlParams = '?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

const images = ['5371575/pexels-photo-5371575.jpeg'];

const pexelURLs = images.map(image => baseURL + image + urlParams);

const googleURLs = [
  //front view
  'https://lh3.googleusercontent.com/pw/AP1GczMG_0SAuV4LhXaquUyzz8v-iEmM0kU_JtDVpzVzsmUVgyfYTXj6Ax_24_uJQrVyFVponTpbQ4izicOHqozbZeJbvrUSz90-XDkpVel7FQGhlC749d6NO7pJP1SYfqni6RMgfUwTvTUcHSLB2lB8yETn=w1599-h781-s-no-gm?authuser=0',
  // lobby
  'https://lh3.googleusercontent.com/pw/AP1GczOifMXaKvggT1Y9NOPWVX5zElFd7QZ7rri_p8IZzqbsxYUkwL1VGLg-SgsSsqBW29L-kIfSb1P6fFKqR7stOqqMy2wecJA2PpCb6IqBdZ7MYgGrv0my3i7UmZEywXEbZKHLZoYnAawGHds0JA9Kx-br=w1023-h579-s-no-gm?authuser=0',
  // pond
  'https://lh3.googleusercontent.com/pw/AP1GczMlWYgkmRBO3NE6yJ44u1CNgR7WtsFisIDSEjsFqUnlwNp-l2A6xqxURCSbkoX1rOp2EoGYU7Wy86HR9ySmwCdyTb_YNI0PY8veMBWSS7iM0wjAr7qf-Ef9hwqNvcQzK9eBLv14qWR0LqqHrM79Xvpt=w1020-h557-s-no-gm?authuser=0',
  // stairwell
  'https://lh3.googleusercontent.com/pw/AP1GczOWaz6So2PY45Hi74CTFK7zSUOQM27Mi2Y-e1aovJx4rXug29vaTW-pSJhCLUMCEidClj9XVE-Ma6ndTDxUVHLfw_Ynq8G2l5d1QhHmV9AviKXYiOMdw4it5PxXkQ3_To_vXPioBU1EPAsCCHcq4r0X=w1024-h592-s-no-gm?authuser=0',
  // lounge
  'https://lh3.googleusercontent.com/pw/AP1GczMcXjB_x4AkUgfrrqz92LhgHc7XgE_yyVreksD90Qwx-lU2xJMxjdGOsvWeRK1e8en8tUILyS0t0Tv4r7vRKPBuGHQ9g1rUqSS4B2qVU2ORvV9KFe7GM5j6-7ln0gVh-7p2-9SIKJQrKLlW54hutRjr=w1023-h513-s-no-gm?authuser=0',
  // hallway
  'https://lh3.googleusercontent.com/pw/AP1GczPf4o2RIaH_9T7WiQ7mVKUk4Mv8xSQoCxDqrL-oS2w-BrKmbYvHvBSdAOvwU0uK5Y9iRU1otKLowsup-ifPMMr5h1Qrjk3ftdbrTm6EM2tjOPyTBJNfuQXXbzMzBFkXbT0bly3UrHDAh1ODRUNCf3oF=w1021-h536-s-no-gm?authuser=0',
  // tub
  'https://lh3.googleusercontent.com/pw/AP1GczNXoFwpVlr53AW5H16pH9JOMkarTbzhWvMOfyrwraIULavi-EaFWANndP1YUDq9DDiSFGi4ntpmawhvqf6G5VTvaNSAFCaHRz5lZsHTanq8Z2nvnLYGVXouZcZPv5ezsnHVMfp9-3XctpU1ioI2ZBZs=w1400-h700-s-no-gm?authuser=0',
];

export const imageURLs = [...pexelURLs, ...googleURLs];
