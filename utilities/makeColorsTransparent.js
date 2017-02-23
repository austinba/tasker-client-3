const R = require('ramda');
const createOutFileName = R.pipe(
  R.split('.'),
  R.converge(
    R.concat,
    [ R.compose(R.concat(R.__, '_trans'), R.join('.'), R.init),
      R.compose(R.concat('.'), R.last)
    ]
  )
);

const inFile = '../src/styles/tasks.css';
const outFile = createOutFileName(inFile);


const fs = require('fs');

const content = fs.readFileSync(inFile).toString();

const splitAroundHashTags = content.split('#');

const newContentAfterFirst = splitAroundHashTags.slice(1).map(text => {

  if(!/^[0-9a-f]+[\s;]{1}$/i.test(text.substr(0,7))) {
    return '#' + text;
  }

  const colorText = text.substr(0, 6);
  const restText  = text.substr(6);

  console.log(colorText);

  const origColorHex = colorText.trim().substr(0,6);
  const red   = parseInt(origColorHex.substr(0,2), 16);
  const green = parseInt(origColorHex.substr(2,2), 16);
  const blue  = parseInt(origColorHex.substr(4,2), 16);

  const max   = Math.max(red, green, blue);


  const opacity = Math.round(max / 255 * 100) / 100; // can be fully transparent if orig color is black, can't be transparent if orig color is white-space

  const [newRed, newGreen, newBlue] =
    [red, green, blue]
      .map(color => opacity !== 0 ? Math.round(color / opacity) : color);

  const newColor = newRed + newGreen * 256 + newBlue * 65536;

  const newColorString = `rgba(${newRed}, ${newGreen}, ${newBlue}, ${opacity}) /*#${origColorHex}*/`;

  return newColorString + restText;

}).join(''); // hashtag should only be present where a conversion didn't take place

const newContent = splitAroundHashTags[0] + newContentAfterFirst
console.log(newContent);
fs.writeFileSync(outFile, newContent);
