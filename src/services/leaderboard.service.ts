import { broadcast } from '../websocket/leaderboard.socket';

export interface Player {
  id: string;
  name: string;
  score: number;
}

const players = new Map<string, Player>();

export function updatePlayerScore(
  id: string,
  name: string,
  score: number,
): Player {
  const player: Player = {
    id,
    name,
    score,
  };

  players.set(id, player);

  broadcast('leaderboard.updated', getLeaderboard());

  return player;
}

export function getLeaderboard(): Player[] {
  return [...players.values()].sort((a, b) => b.score - a.score);
}