import { User } from ".prisma/client";
import Dataloader from "dataloader";
import { prisma } from "..";

type BatchUser = (ids: number[]) => Promise<User[]>;

// this will LOAD users from database 
const batchUsers: BatchUser = async (ids) => {
  console.log(ids);
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  //create Empty map in order to store users Loaded 
  const userMap: { [key: string]: User } = {};

  users.forEach((user) => {
    userMap[user.id] = user;
  });
  
  // return loaded users
  return ids.map((id) => userMap[id]);
};

//@ts-ignore
export const userLoader = new Dataloader<number, User>(batchUsers);
