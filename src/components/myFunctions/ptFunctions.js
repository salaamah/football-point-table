//Add a match to played matches and remove it from unplyaed
function addPlayed(match, result, remainingMatches, playedMatches, matchResults) {
    let ind = remainingMatches.indexOf(match);
    remainingMatches.splice(ind, 1);
    playedMatches.push(match);
    matchResults.push(result);
}

//pointTable = [rank,teams,MP,W,D,L,GF,GA,GD,points];
function addTeam (teamName, pointTable){
    pointTable[0].push(pointTable[0].length);
    pointTable[1].push(teamName);
    for (let i = 2; i < pointTable.length; i++){
        pointTable[i].push(0);
    }
}

//Generate all match titles for a given group of temas
function generateMatches(teams) {
    let allMatches = [];
    for (let i = 0; i < teams.length; i++) {
        for (let j = i+1; j < teams.length; j++){
            allMatches.push(teams[i]+"-"+teams[j]);
        }
    }
    return allMatches;
}

//Return ranking of the teams based on their ponts, GD and GF
function getRanking(GF, GD, points) {
    let pt = [...points];
    let rank = [];
    for (let i = 0; i < pt.length; i++){
        let indexOfMaxPt = pt.indexOf(Math.max(...pt));
        rank[i] = indexOfMaxPt;
        pt[indexOfMaxPt] = -1;
    }
    for(let i = (pt.length-1); i >= 0; i--){
        for (let j = 0; j <= i; j++){
            if (points[rank[j]] === points[rank[j+1]]){
                if (GD[rank[j]] === GD[rank[j+1]]){
                    if (GF[rank[j]] < GF[rank[j+1]]){
                        let t = rank[j];
                        rank[j] = rank[j+1];
                        rank[j+1] = t;
                    }
                }else if (GD[rank[j]] < GD[rank[j+1]]) {
                    let t = rank[j];
                    rank[j] = rank[j+1];
                    rank[j+1] = t;   
                }
            }
        }
    }
    return rank;
}

//Update point table for provided match and its result
function updateTable(match, result, previousTable){
    let [rank,teams,MP,W,D,L,GF,GA,GD,points] = [...previousTable];
    let twoTeams = match.split('-');
    let team1 = twoTeams[0];
    let team2 = twoTeams[1];
    let scores = result.split('-');
    let team1_score = parseInt(scores[0]);
    let team2_score = parseInt(scores[1]);
    let gd = team1_score - team2_score;

    MP[teams.indexOf(team1)] += 1;
    MP[teams.indexOf(team2)] += 1;
    GF[teams.indexOf(team1)] += team1_score;
    GF[teams.indexOf(team2)] += team2_score;
    GA[teams.indexOf(team1)] += team2_score;
    GA[teams.indexOf(team2)] += team1_score;

    if (gd > 0){
        W[teams.indexOf(team1)] += 1;
        L[teams.indexOf(team2)] += 1;
        points[teams.indexOf(team1)] += 3;
        GD[teams.indexOf(team1)] += gd;
        GD[teams.indexOf(team2)] += gd*(-1);
    }else if(gd < 0){
        W[teams.indexOf(team2)] += 1;
        L[teams.indexOf(team1)] += 1;
        points[teams.indexOf(team2)] += 3;
        GD[teams.indexOf(team2)] += gd*(-1);
        GD[teams.indexOf(team1)] += gd;
    }else {
        D[teams.indexOf(team1)] += 1;
        D[teams.indexOf(team2)] += 1;
        points[teams.indexOf(team1)] += 1;
        points[teams.indexOf(team2)] += 1;
    }
    rank = getRanking(GF,GD,points);
}

//Generate combination of all possible results
function getAllPossibleCombinations(numberOfMatches){
    let combinations = [[]];
    let n = numberOfMatches;
    for (let i = 0; i < n; i++) {
        combinations.forEach(comb =>{
            combinations.push(comb.concat('0-0'));
            combinations.push(comb.concat('0-1'));
            combinations.push(comb.concat('1-0'));
        });
        combinations = combinations.filter(comb => comb.length === (i+1));
    } 
    return combinations;
}

//It will give all probable point tables for all
//the combinations of next probable match result 
function analyzeNext(currentTable, remainingMatches){
    let n = remainingMatches.length;
    let allTablesWithResultSet = [];
    let probableResultSets = getAllPossibleCombinations(n);
    probableResultSets.forEach(resultSet =>{
        let rank = [...currentTable[0]];
        let teams = [...currentTable[1]];
        let MP = [...currentTable[2]];
        let W = [...currentTable[3]];
        let D = [...currentTable[4]];
        let L = [...currentTable[5]];
        let GF = [...currentTable[6]];
        let GA = [...currentTable[7]];
        let GD = [...currentTable[8]];
        let points = [...currentTable[9]];
        for(let i = 0; i < n; i++){
            let match = remainingMatches[i];
            let result = resultSet[i];
            updateTable(match, result, [rank,teams,MP,W,D,L,GF,GA,GD,points]);
        }
        //let rank = getRanking(GF, GD, points);
        allTablesWithResultSet.push([rank,teams,MP,W,D,L,GF,GA,GD,points,resultSet]);
    });
    return allTablesWithResultSet;
}

export
{   
    addPlayed, 
    generateMatches, 
    getRanking, 
    updateTable, 
    getAllPossibleCombinations, 
    analyzeNext,
    addTeam
};