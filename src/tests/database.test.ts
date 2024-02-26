import mongoose from "mongoose";
import connectDb from "../database";

describe("Database Connection", () => {
  it("should connect to the database", async () => {
    const spy = jest.spyOn(mongoose, "connect");
    await connectDb();
    expect(spy).toHaveBeenCalled();
  });
});
