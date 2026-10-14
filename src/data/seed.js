const slugify = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const buildTeams = (category, group, names) =>
  names.map((name) => ({
    id: slugify(`${category}-${group}-${name}`),
    category,
    group,
    name,
  }));

export const initialTeams = [
  ...buildTeams("Feminino", "A", [
    "Elas Di Panela",
    "Winxs",
    "Winx Reverso",
    "As Xuxuzinhas",
    "Erro",
  ]),
  ...buildTeams("Feminino", "B", [
    "Inimigas do Vôlei",
    "Facção Winx",
    "Furacão Feminino",
    "Treteiras 2.0",
    "Deu ruim, mas foi ponto",
  ]),
  ...buildTeams("Masculino", "A", [
    "Saque sem pulo",
    "Ataque Fofo",
    "time do Miguel",
    "os coroas",
    "Fúria na rede",
  ]),
  ...buildTeams("Masculino", "B", [
    "Sapequinha vôlei club",
    "Os xuxuzinhos",
    "Central Da Treta",
    "QF4",
    "Di Panela",
  ]),
];

const teamMap = Object.fromEntries(initialTeams.map((team) => [team.name, team.id]));

export const initialMatches = [
  { id: "f_a_1", category: "Feminino", group: "A", team1Id: teamMap["Elas Di Panela"], team2Id: teamMap["Winxs"], score1: 0, score2: 0, isFinished: false },
  { id: "f_a_2", category: "Feminino", group: "A", team1Id: teamMap["Winx Reverso"], team2Id: teamMap["As Xuxuzinhas"], score1: 0, score2: 0, isFinished: false },
  { id: "f_a_3", category: "Feminino", group: "A", team1Id: teamMap["Erro"], team2Id: teamMap["Elas Di Panela"], score1: 0, score2: 0, isFinished: false },
  { id: "f_a_4", category: "Feminino", group: "A", team1Id: teamMap["Winxs"], team2Id: teamMap["Winx Reverso"], score1: 0, score2: 0, isFinished: false },
  { id: "f_a_5", category: "Feminino", group: "A", team1Id: teamMap["As Xuxuzinhas"], team2Id: teamMap["Erro"], score1: 0, score2: 0, isFinished: false },
  { id: "f_a_6", category: "Feminino", group: "A", team1Id: teamMap["Elas Di Panela"], team2Id: teamMap["Winx Reverso"], score1: 0, score2: 0, isFinished: false },
  { id: "f_a_7", category: "Feminino", group: "A", team1Id: teamMap["Erro"], team2Id: teamMap["Winxs"], score1: 0, score2: 0, isFinished: false },
  { id: "f_a_8", category: "Feminino", group: "A", team1Id: teamMap["As Xuxuzinhas"], team2Id: teamMap["Elas Di Panela"], score1: 0, score2: 0, isFinished: false },
  { id: "f_a_9", category: "Feminino", group: "A", team1Id: teamMap["Winx Reverso"], team2Id: teamMap["Erro"], score1: 0, score2: 0, isFinished: false },
  { id: "f_a_10", category: "Feminino", group: "A", team1Id: teamMap["Winxs"], team2Id: teamMap["As Xuxuzinhas"], score1: 0, score2: 0, isFinished: false },

  { id: "f_b_1", category: "Feminino", group: "B", team1Id: teamMap["Inimigas do Vôlei"], team2Id: teamMap["Facção Winx"], score1: 0, score2: 0, isFinished: false },
  { id: "f_b_2", category: "Feminino", group: "B", team1Id: teamMap["Furacão Feminino"], team2Id: teamMap["Treteiras 2.0"], score1: 0, score2: 0, isFinished: false },
  { id: "f_b_3", category: "Feminino", group: "B", team1Id: teamMap["Deu ruim, mas foi ponto"], team2Id: teamMap["Inimigas do Vôlei"], score1: 0, score2: 0, isFinished: false },
  { id: "f_b_4", category: "Feminino", group: "B", team1Id: teamMap["Facção Winx"], team2Id: teamMap["Furacão Feminino"], score1: 0, score2: 0, isFinished: false },
  { id: "f_b_5", category: "Feminino", group: "B", team1Id: teamMap["Treteiras 2.0"], team2Id: teamMap["Deu ruim, mas foi ponto"], score1: 0, score2: 0, isFinished: false },
  { id: "f_b_6", category: "Feminino", group: "B", team1Id: teamMap["Inimigas do Vôlei"], team2Id: teamMap["Furacão Feminino"], score1: 0, score2: 0, isFinished: false },
  { id: "f_b_7", category: "Feminino", group: "B", team1Id: teamMap["Deu ruim, mas foi ponto"], team2Id: teamMap["Facção Winx"], score1: 0, score2: 0, isFinished: false },
  { id: "f_b_8", category: "Feminino", group: "B", team1Id: teamMap["Treteiras 2.0"], team2Id: teamMap["Inimigas do Vôlei"], score1: 0, score2: 0, isFinished: false },
  { id: "f_b_9", category: "Feminino", group: "B", team1Id: teamMap["Furacão Feminino"], team2Id: teamMap["Deu ruim, mas foi ponto"], score1: 0, score2: 0, isFinished: false },
  { id: "f_b_10", category: "Feminino", group: "B", team1Id: teamMap["Facção Winx"], team2Id: teamMap["Treteiras 2.0"], score1: 0, score2: 0, isFinished: false },

  { id: "m_a_1", category: "Masculino", group: "A", team1Id: teamMap["Saque sem pulo"], team2Id: teamMap["Ataque Fofo"], score1: 0, score2: 0, isFinished: false },
  { id: "m_a_2", category: "Masculino", group: "A", team1Id: teamMap["time do Miguel"], team2Id: teamMap["os coroas"], score1: 0, score2: 0, isFinished: false },
  { id: "m_a_3", category: "Masculino", group: "A", team1Id: teamMap["Fúria na rede"], team2Id: teamMap["Saque sem pulo"], score1: 0, score2: 0, isFinished: false },
  { id: "m_a_4", category: "Masculino", group: "A", team1Id: teamMap["Ataque Fofo"], team2Id: teamMap["time do Miguel"], score1: 0, score2: 0, isFinished: false },
  { id: "m_a_5", category: "Masculino", group: "A", team1Id: teamMap["os coroas"], team2Id: teamMap["Fúria na rede"], score1: 0, score2: 0, isFinished: false },
  { id: "m_a_6", category: "Masculino", group: "A", team1Id: teamMap["Saque sem pulo"], team2Id: teamMap["time do Miguel"], score1: 0, score2: 0, isFinished: false },
  { id: "m_a_7", category: "Masculino", group: "A", team1Id: teamMap["Fúria na rede"], team2Id: teamMap["Ataque Fofo"], score1: 0, score2: 0, isFinished: false },
  { id: "m_a_8", category: "Masculino", group: "A", team1Id: teamMap["os coroas"], team2Id: teamMap["Saque sem pulo"], score1: 0, score2: 0, isFinished: false },
  { id: "m_a_9", category: "Masculino", group: "A", team1Id: teamMap["time do Miguel"], team2Id: teamMap["Fúria na rede"], score1: 0, score2: 0, isFinished: false },
  { id: "m_a_10", category: "Masculino", group: "A", team1Id: teamMap["Ataque Fofo"], team2Id: teamMap["os coroas"], score1: 0, score2: 0, isFinished: false },

  { id: "m_b_1", category: "Masculino", group: "B", team1Id: teamMap["Sapequinha vôlei club"], team2Id: teamMap["Os xuxuzinhos"], score1: 0, score2: 0, isFinished: false },
  { id: "m_b_2", category: "Masculino", group: "B", team1Id: teamMap["Central Da Treta"], team2Id: teamMap["QF4"], score1: 0, score2: 0, isFinished: false },
  { id: "m_b_3", category: "Masculino", group: "B", team1Id: teamMap["Di Panela"], team2Id: teamMap["Sapequinha vôlei club"], score1: 0, score2: 0, isFinished: false },
  { id: "m_b_4", category: "Masculino", group: "B", team1Id: teamMap["Os xuxuzinhos"], team2Id: teamMap["Central Da Treta"], score1: 0, score2: 0, isFinished: false },
  { id: "m_b_5", category: "Masculino", group: "B", team1Id: teamMap["QF4"], team2Id: teamMap["Di Panela"], score1: 0, score2: 0, isFinished: false },
  { id: "m_b_6", category: "Masculino", group: "B", team1Id: teamMap["Sapequinha vôlei club"], team2Id: teamMap["Central Da Treta"], score1: 0, score2: 0, isFinished: false },
  { id: "m_b_7", category: "Masculino", group: "B", team1Id: teamMap["Di Panela"], team2Id: teamMap["Os xuxuzinhos"], score1: 0, score2: 0, isFinished: false },
  { id: "m_b_8", category: "Masculino", group: "B", team1Id: teamMap["QF4"], team2Id: teamMap["Sapequinha vôlei club"], score1: 0, score2: 0, isFinished: false },
  { id: "m_b_9", category: "Masculino", group: "B", team1Id: teamMap["Central Da Treta"], team2Id: teamMap["Di Panela"], score1: 0, score2: 0, isFinished: false },
  { id: "m_b_10", category: "Masculino", group: "B", team1Id: teamMap["Os xuxuzinhos"], team2Id: teamMap["QF4"], score1: 0, score2: 0, isFinished: false },
];
