import { Player } from '../types/player';

export class LeaderboardService {
  private readonly players = new Map<string, Player>();

  addPlayer(player: Player): Player {
    if (this.players.has(player.id)) {
      throw new Error('Player already exists');
    }

    this.players.set(player.id, player);

    return player;
  }

  getPlayer(id: string): Player | undefined {
    return this.players.get(id);
  }

  updateScore(id: string, score: number): Player {
    const player = this.players.get(id);

    if (!player) {
      throw new Error('Player not found');
    }

    player.score = score;

    this.players.set(id, player);

    return player;
  }

  getLeaderboard(): Player[] {
    return [...this.players.values()].sort((a, b) => b.score - a.score);
  }
}

export const leaderboardService = new LeaderboardService();