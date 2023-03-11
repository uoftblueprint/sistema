import RNHTMLtoPDF from 'react-native-html-to-pdf';

export const exportPDF = async lessonPlan => {
  var html = [];

  // add title
  html.push(header(lessonPlan.name, 1));

  html.push(moduleInformation(lessonPlan.warmUp, 'Warm Up'));
  html.push(moduleInformation(lessonPlan.mainLesson, 'Main Lesson'));
  html.push(moduleInformation(lessonPlan.coolDown, 'Cool Down'));
  html.push(header('Notes', 2));
  html.push(paragraph(lessonPlan.notes));

  let options = {
    html: html.join(''),
    fileName: 'test',
    directory: 'pdfExport'
  };
  let file = await RNHTMLtoPDF.convert(options);
  console.log(file.filePath);
  return file;
};

const moduleInformation = (m, mName) => {
  var ret = [];
  if (m.length > 0) {
    ret.push(header(mName, 2));
  }
  m.forEach(element => {
    if (element.type === 'text') {
      ret.push(paragraph(element.content));
    }
  });
  return ret.join('');
};

const paragraph = text => {
  return '<p>' + text.toString() + '</p>';
};

const header = (text, importance) => {
  return (
    '<h' +
    importance.toString() +
    '>' +
    text.toString() +
    '</h' +
    importance.toString() +
    '>'
  );
};
