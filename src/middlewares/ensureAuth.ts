import { Request, Response, NextFunction } from "express";
import { decode, verify } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import UserRepository from "../respositorios/UsersRepositorio";
import User from "../models/User";
import AppError from '../errors/AppError';
import AuthConfig from '../config/auth'


export default function ensureAuth( request : Request, response :  Response, next : NextFunction) : void{

  const authHeader = request.headers.authorization;


  if(!authHeader){
    throw new AppError('Falha na Autenticação, JTW token is missing', 401)
  }

  const [, token] = authHeader?.split(" ");

  const decode = verify(token, AuthConfig.jtw.secret)






}