import express, { Application, Request, Response, NextFunction } from "express";
import pkg from "http-status";
const { OK, NOT_FOUND, BAD_REQUEST, CREATED } = pkg;

import messageModel from "../../models/messageModel";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await messageModel.find();
    return res.status(OK).json({
      status: "success",
      data: { messages },
    });
  } catch (error) {
    return res.status(NOT_FOUND).send({
      status: "fail",
      message: "unable to get messages",
    });
  }
};

export const getUniqueMessage = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const message = await messageModel.findById({ _id: id });
    return res.status(OK).json({
      status: "success",
      data: { message },
    });
  } catch (error) {
    return res.status(NOT_FOUND).json({
      status: "fail",
      message: "unable to get message",
    });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const toDate = new Date();
    let day = toDate.toDateString();
    let time = toDate.toLocaleTimeString();
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(BAD_REQUEST)
        .json({ status: "fail", message: "all fields are required" });
    }
    const newMessage = await messageModel.create({
      name: name,
      email,
      message,
      date: day,
      time,
    });
    return res
      .status(CREATED)
      .json({ status: "success", data: { message: newMessage } });
  } catch (error) {
    return res
      .status(NOT_FOUND)
      .send({ status: "fail", message: "unable to create new message" });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const message = await messageModel.findByIdAndDelete({ _id: id });
    if (!message) {
      return res.status(NOT_FOUND).json({
        status: "error",
        message: `message with ${id} is not found`,
      });
    }
    return res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return res.status(NOT_FOUND).send({
      status: "fail",
      message: `message with ${id} as id is not found`,
    });
  }
};
