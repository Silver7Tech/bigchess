export interface ModeItem {
  fill?: string;
}

export type GameCategory = 'classical' | 'blitz' | 'rapid' | 'bullet';
export type GameMode = { increment: number | null; duration: number; category: GameCategory };
