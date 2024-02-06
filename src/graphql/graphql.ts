/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CreateNotification = {
  message: Scalars['String']['input'];
  transactionId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type Dog = {
  __typename?: 'Dog';
  breed: Scalars['String']['output'];
  displayImage?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  images?: Maybe<Array<Maybe<Image>>>;
  subbreeds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo?: Maybe<Todo>;
  createNotification: Notification;
  createPost: Post;
  updateNotification: Notification;
  updateTodo?: Maybe<Todo>;
};


export type MutationAddTodoArgs = {
  type: Scalars['String']['input'];
};


export type MutationCreateNotificationArgs = {
  payload: CreateNotification;
};


export type MutationCreatePostArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationUpdateNotificationArgs = {
  payload: UpdateNotification;
};


export type MutationUpdateTodoArgs = {
  id: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  modifiedAt: Scalars['Date']['output'];
  transactionId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
  uuid: Scalars['ID']['output'];
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String']['output'];
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  dog?: Maybe<Dog>;
  dogs?: Maybe<Array<Maybe<Dog>>>;
  getUnreadNotifications: Array<Notification>;
  todo?: Maybe<Todo>;
  todos?: Maybe<Array<Maybe<Todo>>>;
};


export type QueryDogArgs = {
  breed: Scalars['String']['input'];
};


export type QueryGetUnreadNotificationsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryTodoArgs = {
  id: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  postCreated: Post;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type UpdateNotification = {
  id: Scalars['ID']['input'];
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};
