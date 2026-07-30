import { Player } from '../types/player';
import { broadcast } from '../websocket/leaderboard.socket';

export class LeaderboardService {
  private readonly players = new Map<string, Player>();

  addPlayer(player: Player): Player {
    if (this.players.has(player.id)) {
      throw new Error('Player already exists');
    }

    this.players.set(player.id, player);
    this.broadcastLeaderboard();

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
    this.broadcastLeaderboard();

    return player;
  }

  getLeaderboard(): Player[] {
    return [...this.players.values()].sort((a, b) => b.score - a.score);
  }

  private broadcastLeaderboard() {
    broadcast('leaderboard:update', this.getLeaderboard());
  }
}

export const leaderboardService = new LeaderboardService();