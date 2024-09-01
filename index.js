const fs = require('fs').promises;
const path = require('path');

const readmeTemplate = require('./readme');

const msInOneDay = 1000 * 60 * 60 * 24;
const today = new Date();

async function updateReadme() {
  let updatedContent = readmeTemplate;

  // Remplacer les placeholders
  updatedContent = updatedContent.replace('<#today_date>', getTodayDate());
  updatedContent = updatedContent.replace('<#day_before_new_years>', getDBNWSentence());
  updatedContent = updatedContent.replace('<#Lotbot_signing>', getLotbotSigning());

  // Écrire le contenu mis à jour dans README.md
  console.log(updatedContent);
}

function getTodayDate() {
  return today.toDateString();
}

function getDBNWSentence() {
  const nextYear = today.getFullYear() + 1;
  const nextYearDate = new Date(nextYear, 0, 1);
  const timeUntilNewYear = nextYearDate.getTime() - today.getTime();
  const dayUntilNewYear = Math.ceil(timeUntilNewYear / msInOneDay);
  return `${dayUntilNewYear}`;
}

function getLotbotSigning() {
  const moodByDay = ['love', 'hate', 'wickedness', 'pleasure', 'wickedness', 'cruelty', 'horror'];
  const mood = moodByDay[today.getDay()];
  return `🤖 This README.md is updated with ${mood}, by Lotbot ❤️`;
}

updateReadme().catch(console.error);
