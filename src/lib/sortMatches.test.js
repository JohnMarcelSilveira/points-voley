import test from 'node:test';
import assert from 'node:assert/strict';
import { sortMatchesByGameOrder } from './sortMatches.js';

test('ordena partidas com numeração natural dentro da mesma chave', () => {
  const ordered = sortMatchesByGameOrder([
    { id: 'f_a_10' },
    { id: 'f_a_2' },
    { id: 'f_a_1' },
    { id: 'm_b_2' },
    { id: 'm_b_10' },
    { id: 'm_b_1' },
  ]);

  assert.deepEqual(
    ordered.map((match) => match.id),
    ['f_a_1', 'f_a_2', 'f_a_10', 'm_b_1', 'm_b_2', 'm_b_10'],
  );
});
