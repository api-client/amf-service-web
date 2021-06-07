/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs-extra';
import path from 'path';

async function findAmfMain() {
  const base = path.join('node_modules', 'amf-client-js');
  const specLocation = path.join(base, 'package.json');
  const content = await fs.readJSON(specLocation);
  const { main='index.js' } = content;
  return path.join(base, main);
}

async function fixAmfStrictMode() {
  const fileLocation = await findAmfMain();
  let content = await fs.readFile(fileLocation, 'utf8');
  if (content.startsWith('var SHACLValidator')) {
    return;
  }
  content = content.replace('SHACLValidator = require', 'var SHACLValidator = require');
  content = content.replace('Ajv = require', 'var Ajv = require');
  await fs.writeFile(fileLocation, content);
}

fixAmfStrictMode();
