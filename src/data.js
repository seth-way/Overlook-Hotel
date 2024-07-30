const baseURL = 'https://images.pexels.com/photos/';
const urlParams = '?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

const images = [
  '161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg',
  '5371575/pexels-photo-5371575.jpeg',
  '941861/pexels-photo-941861.jpeg',
  '261102/pexels-photo-261102.jpeg',
];

export const imageURLs = images.map(image => baseURL + image + urlParams);
