const fs = require('fs');
const path = require("path");

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const baseUrl = "https://www.espncricinfo.com";

const request = require("request");
const cheerio = require("cheerio");

dirCreator(path.join("./", "ipl_2020"));
request(url, cb);

function cb(error, response, html) {
    if (error) {
        console.log(error);
        return;
    }
    extractHtml(html);
}

function extractHtml(html) {
    let selectorTool = cheerio.load(html);
    let anchor = selectorTool(".container.pt-0.pb-0 a[data-hover=\"Fixtures and Results\"]").attr("href").trim();
    let resultsLink = baseUrl + anchor;
    request(resultsLink, function (error, response, html) {
        if (error) {
            console.log(error);
            return;
        }
        extractScoresTable(html);
    });
}

function extractScoresTable(html) {
    let selectorTool = cheerio.load(html);
    let scoresTable = selectorTool(".col-md-8.col-16 .match-info-link-FIXTURES");
    for (let i = 0; i < scoresTable.length; i++) {
        let anchor = selectorTool(scoresTable[i]).attr("href");
        let matchDetails = selectorTool(scoresTable[i]).find(".description").text().trim();
        let matchDetailsArr = matchDetails.split(",");
        let matchDate = matchDetailsArr[2].trim();
        let matchStatus = selectorTool(scoresTable[i]).find(".status-text").text().trim();
        let scorecardLink = baseUrl + anchor;
        extractInningsHtml(scorecardLink, matchDate, matchStatus);
    }
}

function extractInningsHtml(url, matchDate, matchStatus) {
    request(url, function (error, response, html) {
        if (error) {
            console.log(error);
            return;
        }
        extractBatsmen(html, matchDate, matchStatus);
    });
}

function extractBatsmen(html, matchDate, matchStatus) {
    let selectorTool = cheerio.load(html);
    let teamNames = selectorTool("#main-container .card .teams>.team p");
    let teamName1 = selectorTool(teamNames[0]).text().trim();
    let teamName2 = selectorTool(teamNames[1]).text().trim();
    // console.log(teamName1 + " - " + teamName2);
    let matchTables = selectorTool(".card.content-block.match-scorecard-table");
    let batsmenTable1 = selectorTool(matchTables[0]).find(".table.batsman tbody>tr");
    let batsmenTable2 = selectorTool(matchTables[1]).find(".table.batsman tbody>tr");
    let detailsTable = selectorTool(matchTables[2]).find(".table-responsive tbody>tr");
    // console.log(batsmenTable1.length + " - " + batsmenTable2.length + " - " + detailsTable.length);

    extractBatmanDetails(selectorTool, teamName1, teamName2, batsmenTable1, matchDate, matchStatus);
    extractBatmanDetails(selectorTool, teamName2, teamName1, batsmenTable2, matchDate, matchStatus);

}

function extractBatmanDetails(selectorTool, teamName, oppTeamName, batsmenTable, matchDate, matchStatus) {
    for (let i = 0; i < batsmenTable.length - 1; i += 2) {

        let batsmanDetailsTable = selectorTool(batsmenTable[i]).find("td");

        let batsmanName = selectorTool(batsmanDetailsTable[0]).text().trim();
        let batsmanOpponent = selectorTool(batsmanDetailsTable[1]).text().trim();
        let batsmanRuns = selectorTool(batsmanDetailsTable[2]).text().trim();
        let batsmanBalls = selectorTool(batsmanDetailsTable[3]).text().trim();
        let batsmanFours = selectorTool(batsmanDetailsTable[5]).text().trim();
        let batsmanSixes = selectorTool(batsmanDetailsTable[6]).text().trim();
        let batsmanSR = selectorTool(batsmanDetailsTable[7]).text().trim();

        let batsman = {
            "name" : batsmanName,
            "teamName" : teamName,
            "runs" : batsmanRuns,
            "balls" : batsmanBalls,
            "fours" : batsmanFours,
            "sixes" : batsmanSixes,
            "SR" : batsmanSR,
            "opponent" : batsmanOpponent,
            "oppenentTeam" : oppTeamName,
            "matchDate" : matchDate,
            "matchStatus" : matchStatus
        }

        let dirPath = path.join("./", "ipl_2020", teamName);
        let fileName = batsmanName + ".json";
        updateJson(dirPath, fileName, batsman);
        
    }
}

function updateJson(dirPath, fileName, batsman) {
    dirCreator(dirPath);
    jsonCreator(path.join(dirPath, fileName), batsman);
}

function dirCreator(filePath) {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
        console.log(filePath + " -> Created");
    }
}

function jsonCreator(filePath, content) {
    let contentArr = [];
    if (fs.existsSync(filePath)) {
        let readFile = fs.readFileSync(filePath);
        contentArr = JSON.parse(readFile);
        console.log(filePath + " -> Altering");
    } else {
        console.log(filePath + " -> Creating");
    }
    contentArr.push(content);
    let data = JSON.stringify(contentArr);
    fs.writeFileSync(filePath, data);
}