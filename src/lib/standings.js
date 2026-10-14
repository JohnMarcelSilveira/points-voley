function emptyRow(team) {
  return {
    team,
    wins: 0,
    losses: 0,
    points: 0,
    pointsFor: 0,
    pointsAgainst: 0,
    setDiff: 0,
  };
}

function headToHeadResult(matches, teamA, teamB) {
  const direct = matches.find(
    (match) =>
      match.isFinished &&
      ((match.team1 === teamA && match.team2 === teamB) ||
        (match.team1 === teamB && match.team2 === teamA)),
  );

  if (!direct) return 0;

  const aScore = direct.team1 === teamA ? direct.score1 : direct.score2;
  const bScore = direct.team1 === teamB ? direct.score1 : direct.score2;

  if (aScore === bScore) return 0;
  return bScore - aScore;
}

export function computeStandings(matches, group) {
  const groupMatches = matches.filter((match) => match.group === group);
  const teams = new Set();

  groupMatches.forEach((match) => {
    teams.add(match.team1);
    teams.add(match.team2);
  });

  const table = {};
  teams.forEach((team) => {
    table[team] = emptyRow(team);
  });

  groupMatches
    .filter((match) => match.isFinished)
    .forEach((match) => {
      const home = table[match.team1];
      const away = table[match.team2];

      home.pointsFor += Number(match.score1) || 0;
      home.pointsAgainst += Number(match.score2) || 0;
      away.pointsFor += Number(match.score2) || 0;
      away.pointsAgainst += Number(match.score1) || 0;

      if (match.score1 > match.score2) {
        home.wins += 1;
        home.points += 1;
        away.losses += 1;
      } else if (match.score2 > match.score1) {
        away.wins += 1;
        away.points += 1;
        home.losses += 1;
      }
    });

  Object.values(table).forEach((row) => {
    row.setDiff = row.pointsFor - row.pointsAgainst;
  });

  return Object.values(table).sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.setDiff !== a.setDiff) return b.setDiff - a.setDiff;

    const h2h = headToHeadResult(groupMatches, a.team, b.team);
    if (h2h !== 0) return h2h;

    return a.team.localeCompare(b.team, "pt-BR");
  });
}
