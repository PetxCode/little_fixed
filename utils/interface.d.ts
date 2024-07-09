import { Document } from "mongoose";

export interface iUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  avatarID: string;
  todos: {}[];
}

export interface iUserData extends iUser, Document {}

export interface iTodo {
  title: string;
  desc: string;
  status: boolean;
  user: {};
}

export interface iTodoData extends iTodo, Document {}
