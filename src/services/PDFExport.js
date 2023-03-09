import RNHTMLtoPDF from 'react-native-html-to-pdf';

export const exportPDF = async () => {
  let options = {
    html: '<h1> PDF TEST </h1>',
    fileName: 'test'
  };
  let file = await RNHTMLtoPDF.convert(options);
  console.log(file.filePath);
  return file;
};
