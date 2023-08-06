import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { ModuleType } from './constants';

/**
 * creates a pdf for a given lesson plan
 *
 * @async
 */
export const createPDF = async lessonPlan => {
  console.log(lessonPlan);
  var html = ['<body style="font-family:Arial">'];

  // add title
  html.push(header(`Lesson Plan: ${lessonPlan['lessonPlanName']}`, 1));

  html.push(moduleInformation(lessonPlan['Warm Up'], 'Warm Up'));
  html.push(moduleInformation(lessonPlan['Main Lesson'], 'Main Lesson'));
  html.push(moduleInformation(lessonPlan['Cool Down'], 'Cool Down'));
  // eslint-disable-next-line no-extra-boolean-cast
  if (!!lessonPlan['Notes']) {
    html.push(header('Notes', 2));
    html.push(paragraph(lessonPlan['Notes']));
  }
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
 * @param {import('./models').Module} module
 * @param {string} moduleName
 */
const moduleInformation = (module, moduleName) => {
  var ret = [];
  console.log(moduleName);
  if (module.length > 0) {
    ret.push(header(moduleName, 2));
  }
  module.forEach(element => {
    if (element.type === ModuleType.text) {
      ret.push(paragraph(element.content));
    } else if (element.type === ModuleType.link) {
      // Clean the link first
      cleanLink = element.content;
      if (cleanLink.search(/^http[s]?\:\/\//) == -1) {
        cleanLink = 'http://' + cleanLink;
      }
      
      ret.push(
        `<p>Link: ${element.title} <a href="${cleanLink}">${cleanLink}</a></p>`,
      );
    } else if (element.type === ModuleType.activityCard) {
      // If the module type is activity card
      ret.push(
        `<img src="file://${element.path}" style="height:600;float:center;border:0px"/><br/>`,
      );
    } else {
      // If the module type is image
      ret.push(
        `<img src="file://${element.path}" style="width:70%;float:center;border:0px"/><br/>`,
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
