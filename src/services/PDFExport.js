import RNHTMLtoPDF from 'react-native-html-to-pdf';

/**
 * creates a pdf for a given lesson plan
 *
 * @async
 * @param {import("./models").LessonPlan} lessonPlan
 * @returns {Promise<RNHTMLtoPDF.Pdf>}
 */
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
  let file = RNHTMLtoPDF.convert(options);
  return file;
};

/**
 * creates HTML for a module
 *
 * @param {import("./models").Module[]} m
 * @param {string} mName
 * @returns {string[]}
 */
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

/**
 * creates an HTML paragraph
 *
 * @param {string} text
 * @returns {string}
 */
const paragraph = text => {
  return '<p>' + text.toString() + '</p>';
};

/**
 * creates an HTML header
 *
 * @param {string} text
 * @param {number} importance
 * @returns {string}
 */
const header = (text, importance) => {
  return (
    '<h' +
    importance.toString() +
    '>' +
    text +
    '</h' +
    importance.toString() +
    '>'
  );
};
