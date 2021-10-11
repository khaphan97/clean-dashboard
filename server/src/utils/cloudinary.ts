import cloudinary from 'cloudinary';

const cloudinaryInstance = cloudinary.v2;

cloudinaryInstance.config({
  cloud_name: 'khaphanhuy',
  api_key: '184887413631269',
  api_secret: '4L92WLRy_q4r3BAnv9ADHoexjRU',
  secure: true,
});

export default cloudinaryInstance;
