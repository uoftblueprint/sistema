import RNHTMLtoPDF from 'react-native-html-to-pdf';

/**
 * creates a pdf for a given lesson plan
 *
 * @async
 */
export const createPDF = async lessonPlan => {
  console.log(lessonPlan);
  var html = ['<body>'];

  // add title
  html.push(header('Lesson Plan', 1));

  html.push(moduleInformation(lessonPlan['Warm Up'], 'Warm Up'));
  html.push(moduleInformation(lessonPlan['Main Lesson'], 'Main Lesson'));
  html.push(moduleInformation(lessonPlan['Cool Down'], 'Cool Down'));
  html.push(header('Notes', 2));
  html.push(paragraph(lessonPlan.notes));
  html.push('</body>');

  console.log(html);
  let options = {
    html: html.join(''),
    fileName: 'LessonPlan',
  };
  return await RNHTMLtoPDF.convert(options);
};

/**
 * creates HTML for a module
 *
 * @param module
 * @param {string} moduleName
 */
const moduleInformation = (module, moduleName) => {
  var ret = [];
  console.log(moduleName);
  if (module.length > 0) {
    ret.push(header(moduleName, 2));
  }
  module.forEach(element => {
    if (element.type === 'text') {
      ret.push(paragraph(element.content));
    } else {
      ret.push(
        `<img src="file://${element.content}" style="height:600;float:center;border:0px"/><br>`,
      );
    }
  });
  return ret.join('');
};

/**
 * creates an HTML paragraph
 *
 * @param {string} text
 */
const paragraph = text => {
  return '<p>' + text + '</p>';
};

/**
 * creates an HTML header
 *
 * @param {string} text
 * @param {number} importance
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