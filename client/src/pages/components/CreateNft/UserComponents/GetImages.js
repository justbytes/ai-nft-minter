// import { useEffect } from 'react';
// import fetch from 'node-fetch';

// export const generatedImages = async (id) => {
//   var generatedImageList = [];
//   useEffect(async () => {
//     const response = await fetch('/user/generated-images', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ userId: id }),
//     });
//     if (!response.ok) {
//       throw new Error(
//         `There was a problem updating nft count. Request failed with status code ${response.status}`
//       );
//     }
//     const result = await response.json();
//     console.log(result);
//   });
// };
