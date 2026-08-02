import { Player } from '../services/leaderboard.service';

interface ScoreHistory {
  playerId: string;
  name: string;
  score: number;
  createdAt: Date;
}

const scoreHistory: ScoreHistory[] = [];

export function addScoreHistory(player: Player) {
  scoreHistory.push({
    playerId: player.id,
    name: player.name,
    score: player.score,
    createdAt: new Date(),
  });
}

export function getTopPlayersReport(
  from?: Date,
  to?: Date,
  limit = 10,
) {
  const filteredHistory = scoreHistory.filter((item) => {
    if (from && item.createdAt < from) {
      return false;
    }

    if (to && item.createdAt > to) {
      return false;
    }

    return true;
  });

  const totals = new Map<
    string,
    {
      playerId: string;
      name: string;
      totalScore: number;
    }
  >();

  for (const item of filteredHistory) {
    const current = totals.get(item.playerId);

    if (current) {
      current.totalScore += item.score;
    } else {
      totals.set(item.playerId, {
        playerId: item.playerId,
        name: item.name,
        totalScore: item.score,
      });
    }
  }

  return [...totals.values()]
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, limit);
}