const { promises: fs } = require('fs');
const path = require('path');

const msInOneDay = 1000 * 60 * 60 * 24;

const today = new Date();

async function generateNewREADME() {
  const readmePath = path.join(__dirname, 'README.md');
  const readmeContent = await fs.readFile(readmePath, 'utf-8');
  const readmeRows = readmeContent.split('\n');

  function updateIdentifier(identifier, replaceText) {
    const identifierIndex = findIdentifierIndex(readmeRows, identifier);
    if (identifierIndex === -1) return;
    readmeRows[identifierIndex] = readmeRows[identifierIndex].replace(
      `<#${identifier}>`,
      replaceText
    );
  }

  const identifierToUpdate = {
    day_before_new_years: getDBNWSentence(),
    today_date: getTodayDate(),
    Lotbot_signing: getLotbotSigning(),
    myself: getMySelf(),
  };

  Object.entries(identifierToUpdate).forEach(([key, value]) => {
    updateIdentifier(key, value);
  });

  return readmeRows.join('\n');
}

const moodByDay = {
  0: 'love',
  1: 'hate',
  2: 'wickedness',
  3: 'pleasure',
  4: 'wickedness',
  5: 'cruelty',
  6: 'horror',
};

function getLotbotSigning() {
  const mood = moodByDay[today.getDay()];
  return `🤖 This README.md is updated with ${mood}, by Lotbot ❤️`;
}

function getTodayDate() {
  return today.toDateString();
}

function getMySelf() {
  return today.getDate() % 2 === 0
    ? Math.random() < 0.5 ? 'penguin 🐧' : 'bear 🐻'
    : 'penguin bear 🐧🐻';
}

function getDBNWSentence() {
  const nextYear = today.getFullYear() + 1;
  const nextYearDate = new Date(nextYear, 0, 1);

  const timeUntilNewYear = nextYearDate.getTime() - today.getTime();
  const dayUntilNewYear = Math.ceil(timeUntilNewYear / msInOneDay);

  return `**${dayUntilNewYear} day${dayUntilNewYear !== 1 ? 's' : ''} before ${nextYear} ⏱**`;
}

const findIdentifierIndex = (rows, identifier) =>
  rows.findIndex((r) => r.includes(`<#${identifier}>`));

const updateREADMEFile = (text) => fs.writeFile(path.join(__dirname, 'README.md'), text);

async function main() {
  try {
    const newREADME = await generateNewREADME();
    console.log(newREADME);
    await updateREADMEFile(newREADME);
    console.log('README.md updated successfully');
  } catch (error) {
    console.error('Error updating README.md:', error);
  }
}

main();