export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
}

export interface Tweet {
  id: string;
  content: string;
  author: User;
  timestamp: Date;
  likes: number;
  qualityScore: number;
  critique?: string;
}

export interface AnalysisResult {
  approved: boolean;
  score: number;
  critique: string;
  improvedVersion?: string;
}

export enum NavItem {
  HOME = 'home',
  EXPLORE = 'explore',
  NOTIFICATIONS = 'notifications',
  PROFILE = 'profile'
}