// Cobbled together on nights between cans of caffeine and a bottle of RumChata.
const core = require('@actions/core');
const fs = require('fs');

// -- Functions --
const getRandomNumber = () => Math.floor((Math.random() * 20) + 1);
const getClassInitiativeBonus = chosenClass => {
    if(chosenClass === "warrior") return 1;
    if(chosenClass === "cleric") return 1;
    if(chosenClass === "rogue") return 3;
    if(chosenClass === "wizard") return -1;
    return 0;
}
const getChosenClass = () => {
    const title = core.getInput('title') || "roll|warrior";
    const titleArray = title.split(`|`);
    return titleArray[1];
}
const getRoll = (chosenClass) => {
    let roll = getRandomNumber() + getClassInitiativeBonus(chosenClass);
    return Math.max(roll, 1);
}
const splitDatabaseText = (databaseText, textToFind) => {
    const array = databaseText.split(",");
    const foundTextArray = array.find(a => a.includes(textToFind));
    return foundTextArray.split("|");
}
const getDatabaseValue = (databaseText, textToFind) => {
    const foundTextArray = splitDatabaseText(databaseText, textToFind);
    return Number.parseInt(foundTextArray[1]);
}
const updateClassTableText = (databaseText) => {
    readMeText += "|Class|Count|\n" +
        "|-|-|\n" +
        "|Warrior|" + getDatabaseValue(databaseText, "warrior") + "|\n" +
        "|Cleric|" + getDatabaseValue(databaseText, "cleric") + "|\n" +
        "|Rogue|" + getDatabaseValue(databaseText, "rogue") + "|\n" +
        "|Wizard|" + getDatabaseValue(databaseText, "wizard") + "|\n";
}
const createClassLink = (chosenClass) => {
    return `https://github.com/benjaminsampica/benjaminsampica/issues/new?title=roll%7C${chosenClass}&body=Just+click+%27Submit+new+issue%27.`;
}
const updateRollTableText = (databaseText) => {
    readMeText += "|Roll|Count|\n" +
        "|-|-|\n";
    
    for(let i = 23; i >= 0; i--)
        readMeText += `|${i}|` + getDatabaseValue(databaseText, `-${i}-`) + "\n";
}
const setDatabaseValue = (databaseText, textToFind, newValue) => {
    let textArray = splitDatabaseText(databaseText, textToFind);
    const key = textArray[0] + "|";
    const newText = key + newValue;
    const textToReplace = key + textArray[1];

    return databaseText.replace(textToReplace, newText);
}

// -- End Functions --

// -- Main --

let rollDatabaseText = fs.readFileSync('./rollDatabase.txt', 'utf8');
let classDatabaseText = fs.readFileSync('./classDatabase.txt', 'utf8');

const usersClass = getChosenClass();
const newClassValue = getDatabaseValue(classDatabaseText, usersClass) + 1;
const roll = getRoll(usersClass);
const newRollValue = getDatabaseValue(rollDatabaseText, `-${roll}-`) + 1;

console.log(roll);
classDatabaseText = setDatabaseValue(classDatabaseText, usersClass, newClassValue);
rollDatabaseText = setDatabaseValue(rollDatabaseText, `-${roll}-`, newRollValue);

const user = core.getInput('user');
let readMeText =
    "# Hi there, I'm NotMinhDucGamingTV <img width="30px" src="https://github.com/SatYu26/SatYu26/raw/master/Assets/Hi.gif" />" +"<img align="right" alt="GIF" height="160px" src="https://octodex.github.com/images/daftpunktocat-guy.gif" />\n" + "## I'm learning to be a Discord Bot Developer And also a Roblox game dev\n"+ "- 🌱 I am new in Discord.JS:)\n"+ "- 🏆 2021 Goals: Contribute to more open source projects and upgrading my [discord bot!](https://discord.com/api/oauth2/authorize?client_id=892340813906968587&permissions=8&redirect_uri=https%3A%2F%2Fbotdashboard.minhducgaming.ihostfull.com%2Fthanks&scope=bot%20applications.commands)\n"+"- 📫 What is the best way to contact me? [Discord](https://discord.com/users/470047132670361610)\n" + "- 😄 Pronouns: He/Him\n\n" + "[![GitHub](https://img.shields.io/badge/Github-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/1stminhcar)\n"+"[![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/YpbvvR9SX8)\n"
    "### CHOOSE YOUR CLASS\n" +
    `\n[Warrior | +1 To Roll](${createClassLink("warrior")})\n` +
    `\n[Cleric | +1 To Roll](${createClassLink("cleric")})\n` +
    `\n[Rogue | +3 To Roll](${createClassLink("rogue")})\n` +
    `\n[Wizard | -1 To Roll](${createClassLink("wizard")})\n` +
    "### LAST ROLL BY\n" +
    `[${user}](https://www.github.com/${user}) - as a ${usersClass} rolled a ${roll}!` +
    "\n\n";

updateClassTableText(classDatabaseText);
readMeText += "\n";
updateRollTableText(rollDatabaseText);

fs.writeFileSync('./README.md', readMeText);
fs.writeFileSync('./rollDatabase.txt', rollDatabaseText);
fs.writeFileSync('./classDatabase.txt', classDatabaseText);


