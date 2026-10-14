const categoryOrder = { f: 0, m: 1 };
const groupOrder = { a: 0, b: 1 };

function parseMatchSortKey(match) {
  const id = String(match?.id ?? "");
  const [categoryToken = "", groupToken = "", numberToken = ""] = id.split("_");

  return [
    categoryOrder[categoryToken.toLowerCase()] ?? 99,
    groupOrder[groupToken.toLowerCase()] ?? 99,
    Number.parseInt(numberToken, 10) || 0,
    id,
  ];
}

export function sortMatchesByGameOrder(matches) {
  return [...matches].sort((leftMatch, rightMatch) => {
    const left = parseMatchSortKey(leftMatch);
    const right = parseMatchSortKey(rightMatch);

    for (let index = 0; index < 3; index += 1) {
      if (left[index] !== right[index]) {
        return left[index] - right[index];
      }
    }

    return left[3].localeCompare(right[3], "pt-BR");
  });
}
