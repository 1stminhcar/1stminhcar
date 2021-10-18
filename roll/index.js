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
    return `https://github.com/1stminhcar/1stminhcar/issues/new?title=roll%7C${chosenClass}&body=Just+click+%27Submit+new+issue%27.`;
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
    # Hi there, I'm NotMinhDucGamingTV <img width="30px" src="https://github.com/SatYu26/SatYu26/raw/master/Assets/Hi.gif" />"\

<img align="right" alt="GIF" height="160px" src="https://octodex.github.com/images/daftpunktocat-guy.gif" />

## I'm learning to be a Discord Bot Developer

- 🌱 I am new in Discord.JS:)
- 🏆 2021 Goals: Contribute to more open source projects and upgrading my [discord bot!](https://discord.com/api/oauth2/authorize?client_id=892340813906968587&permissions=0&redirect_uri=https%3A%2F%2Fwebsite-for-my-bot.herokuapp.com%2Fapi%2Fv1%2Fauth&scope=bot%20applications.commands)
- 📫 What is the best way to contact me? [Discord](https://discord.com/users/470047132670361610)
- 😄 Pronouns: He/Him

[![GitHub](https://img.shields.io/badge/Github-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/1stminhcar)
[![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/YpbvvR9SX8)
[![Reddit](https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white)](https://www.reddit.com/user/Unlikely-Agent)

---

<img align="right" alt="GIF" height="170px" src="https://media.giphy.com/media/J5B1Y8QZnzXXbLQIBu/giphy.gif" />
  Listening On Spotify:

[![Spotify](https://novatorem-kyzbk7wxl-bardiesel.vercel.app/api/spotify)](https://open.spotify.com/user/31xhadxgkhc6hcgu6qvu5snptxh4)

---
<!--START_SECTION:waka-->
**My Commits:** 

```text
🌞 Morning    1 commits    ████████░░░░░░░░░░░░░░░░░  25%
🌆 Daytime    1 commits    ████████░░░░░░░░░░░░░░░░░  25%
🌃 Evening    1 commits    ████████░░░░░░░░░░░░░░░░░  25%
🌙 Night      1 commits    ████████░░░░░░░░░░░░░░░░░  25%
```
<!--END_SECTION:waka-->

---

### OS and Cloud Services
[![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://android.com)
[![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)](https://microsoft.com/windows)
[![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)](https://heroku.com)
[![Repl.it](https://img.shields.io/badge/replit-667881?style=for-the-badge&logo=replit&logoColor=white)](https://replit.com)
[![Glitch](https://img.shields.io/badge/Glitch-2800ff?style=for-the-badge&logo=glitch&logoColor=white)](https://glitch.com)

### Browsers and IDE
[![Google Chrome](https://img.shields.io/badge/Google_chrome-4285F4?style=for-the-badge&logo=Google-chrome&logoColor=white)](https://google.com/chrome/)
[![GitHub](https://img.shields.io/badge/Github-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com)
[![Notepad++](https://img.shields.io/badge/Notepad++-90E59A.svg?style=for-the-badge&logo=notepad%2B%2B&logoColor=black)](https://notepad-plus-plus.org)

### Github Stats
[![trophy](https://github-profile-trophy.vercel.app/?username=1stminhcar&theme=onedark&title=Joined2020,Commit,Followers,Repositories,Stars,PullRequest)](https://github.com/ryo-ma/github-profile-trophy)
![Simpleboy353's GitHub stats](https://github-readme-stats.vercel.app/api?username=1stminhcar&show_icons=true&theme=radical)
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=1stminhcar)](https://github.com/anuraghazra/github-readme-stats)

---
## Statistic
![Metrics](https://metrics.lecoq.io/1stminhcar?template=classic&config.timezone=Asia%2FHo_Chi_Minh)
---
Recent Commmit:
  <!--START_SECTION:activity-->
1. ❗️ Opened issue [#11](https://github.com/1stminhcar/1stminhcar/issues/11) in [1stminhcar/1stminhcar](https://github.com/1stminhcar/1stminhcar)
2. 🎉 Merged PR [#10](https://github.com/1stminhcar/1stminhcar/pull/10) in [1stminhcar/1stminhcar](https://github.com/1stminhcar/1stminhcar)
3. 💪 Opened PR [#10](https://github.com/1stminhcar/1stminhcar/pull/10) in [1stminhcar/1stminhcar](https://github.com/1stminhcar/1stminhcar)
4. ❗️ Opened issue [#17356](https://github.com/timburgan/timburgan/issues/17356) in [timburgan/timburgan](https://github.com/timburgan/timburgan)
5. ❗️ Opened issue [#9](https://github.com/1stminhcar/1stminhcar/issues/9) in [1stminhcar/1stminhcar](https://github.com/1stminhcar/1stminhcar)
5.
<!--END_SECTION:activity-->

##Visitor:![visitors](https://visitor-badge.glitch.me/badge?page_id=1stminhcar.1stminhcar&left_color=black&right_color=black)

---
## Minigame Corner:
# ROLL FOR INITIATIVE
"### CHOOSE YOUR CLASS\n" +
    `\n[Warrior | +1 To Roll](${createClassLink("warrior")})\n` +
    `\n[Cleric | +1 To Roll](${createClassLink("cleric")})\n` +
    `\n[Rogue | +3 To Roll](${createClassLink("rogue")})\n` +
    `\n[Wizard | -1 To Roll](${createClassLink("wizard")})\n` +
    "### LAST ROLL BY\n" +
    `[${user}](https://www.github.com/${user}) - as a ${usersClass} rolled a ${roll}!` +
    "\n\n";"\

updateClassTableText(classDatabaseText);
readMeText += "\n";
updateRollTableText(rollDatabaseText);
<img src="https://imgur.com/rilHVxA.png"/> 


fs.writeFileSync('./README.md', readMeText);
fs.writeFileSync('./rollDatabase.txt', rollDatabaseText);
fs.writeFileSync('./classDatabase.txt', classDatabaseText);


