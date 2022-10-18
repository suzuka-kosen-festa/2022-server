import { LiveEvent } from "@prisma/client";
import { SeparationEventList } from "../types";

export const formatEvent = (array : LiveEvent[]) : SeparationEventList =>{
  
  const gameStage = array.filter(data => data.stage === "game")
  const mainStage = array.filter(data => data.stage === "main")
  const subStage = array.filter(data => data.stage === "sub")
  const liveStage = array.filter(data => data.stage === "live")

  const object : SeparationEventList ={
    main: mainStage,
    sub: subStage,
    live: liveStage,
    game : gameStage
  }

  return object
}