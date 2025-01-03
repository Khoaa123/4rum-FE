export type Thread = {
  id: number;
  title: string;
  isSticky: boolean;
  content: string;
  viewCount: number;
  createdAt: string;
  tag: string;
  displayName: string;
  avatarUrl: string;
  userId: string;
  forumName: string;
  forumId: number;
  totalComments: number;
  comments: Comment[];
  lastCommenterAvatarUrl: string;
  lastCommentAt: string;
  lastCommentBy: string;
};

export type DecodeToken = {
  DisplayName: string;
  nameid: string;
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  threadName: string;
  userName: string;
  avatarUrl: string;
  replies: any[];
  reactions: Reaction[];
  parentCommentId: number;
};

export type Reaction = {
  id: number;
  type: number;
  userName: string;
  avatarUrl: string;
  userId: string;
  createdAt: string;
};

export type Category = {
  id: number;
  name: string;
  forumCount: number;
};

export type Forum = {
  id: number;
  name: string;
  categoryName: string;
  threadCount: number;
};

export type User = {
  id: string;
  userName: string;
  displayName: string;
  avatarUrl: string | null;
  reactionScore: number;
  lastActivity: string;
  role: string;
};
