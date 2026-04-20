import fs from 'fs';
import path from 'path';

const files = [
  'C:\\Users\\HP\\.gemini\\antigravity\\brain\\58842060-dc0e-4ede-a2c0-7e1975e4e397\\region_1_models_1776680511965.png',
  'C:\\Users\\HP\\.gemini\\antigravity\\brain\\58842060-dc0e-4ede-a2c0-7e1975e4e397\\region_2_models_1776680532724.png',
  'C:\\Users\\HP\\.gemini\\antigravity\\brain\\58842060-dc0e-4ede-a2c0-7e1975e4e397\\region_3_models_1776680574762.png',
  'C:\\Users\\HP\\.gemini\\antigravity\\brain\\58842060-dc0e-4ede-a2c0-7e1975e4e397\\region_4_models_1776680602083.png',
  'C:\\Users\\HP\\.gemini\\antigravity\\brain\\58842060-dc0e-4ede-a2c0-7e1975e4e397\\region_5_models_1776680634160.png',
  'C:\\Users\\HP\\.gemini\\antigravity\\brain\\58842060-dc0e-4ede-a2c0-7e1975e4e397\\zimbabwe_regions_map_1776682309994.png'
];

const destNames = [
  'region-1-models.png',
  'region-2-models.png',
  'region-3-models.png',
  'region-4-models.png',
  'region-5-models.png',
  'zimbabwe-regions-map.png'
];

// Ensure public/images directory exists
const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

files.forEach((file, index) => {
  const dest = path.join(imagesDir, destNames[index]);
  try {
    fs.copyFileSync(file, dest);
    console.log(`✅ Successfully copied ${destNames[index]}`);
  } catch (e) {
    console.error(`❌ Failed to copy ${destNames[index]}:`, e.message);
  }
});

console.log('\nAll done! You can now commit the public/images folder so they work on the server.');
