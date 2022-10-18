import { Test, TestingModule } from '@nestjs/testing';
import { LiveEvent, Prisma } from '@prisma/client';
import { UpdateEventDto } from './dto/liveEvent.sto';
import { LiveeventController } from './liveevent.controller';
import { LiveeventService } from './liveevent.service';

const eventArray : LiveEvent[] = [
{id :1, title: "てすとイベント1", descriptions: "説明1", date : "2022-10-30 12:10", venue: "会場1", start_time: "2022-10-30 12:10", end_time: "2022-10-30 13:10", stage: "main"},
{id :2, title: "てすとイベント2", descriptions: "説明2", date : "2022-10-28 11:10", venue: "会場2", start_time: "2022-10-28 11:10", end_time: "2022-10-28 12:10", stage: "game"},
{id :3, title: "てすとイベント3", descriptions: "説明3", date : "2022-10-29 12:10", venue: "会場3", start_time: "2022-10-29 12:10", end_time: "2022-10-29 13:10", stage: "sub"},
{id :4, title: "てすとイベント4", descriptions: "説明4", date : "2022-10-31 11:10", venue: "会場4", start_time: "2022-10-31 11:10", end_time: "2022-10-31 14:10", stage: "game"},
{id :5, title: "てすとイベント5", descriptions: "説明5", date : "2022-10-31 14:10", venue: "会場5", start_time: "2022-10-31 14:10", end_time: "2022-10-31 15:10", stage: "main"}
]


describe('LiveeventController', () => {
   let controller: LiveeventController;

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [LiveeventController],
         providers: [{
          provide: LiveeventService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(eventArray),
            getByDate: jest.fn().mockResolvedValue(eventArray[0]),
            getNearTime : jest.fn().mockResolvedValue(eventArray[0]),
            getById : jest.fn().mockResolvedValue(eventArray[0]),
            create : jest.fn().mockResolvedValue(eventArray[0]),
            update: jest.fn().mockResolvedValue(eventArray[0]),
            delete : jest.fn().mockResolvedValue(eventArray[0])
          }
         }]
      }).compile();

      controller = module.get<LiveeventController>(LiveeventController);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });

   it("getAllEvent", async () =>{
      const data = await controller.getAllEvent()
      expect(data).toEqual(eventArray)
   })
   
   it("getById",async () => {
      const data = await controller.getEvent("1")
      expect(data).toEqual(eventArray[0])
   })

   it("getByDate",async () => {
      const data = await controller.getEventBydate("2022-10-30 12:10")
      expect(data).toEqual(eventArray[0])
   })

   it("getNearTime",async () => {
      const data = await controller.getNearEvent()
      expect(data).toEqual(eventArray[0])
   })

   it("create",async () => {
      const eventData : Prisma.LiveEventCreateInput = {title: "てすとイベント1", descriptions: "説明1", date : "2022-10-30 12:10", venue: "会場1", start_time: "2022-10-30 12:10", end_time: "2022-10-30 13:10", stage: "main"}
      const data = await controller.createEvent(eventData)

      expect(data).toEqual(eventArray[0])
   })

   it("update",async () => {
      const eventData : UpdateEventDto = {title: "てすとイベント1", descriptions: "説明1", date : "2022-10-30 12:10", venue: "会場1", start_time: "2022-10-30 12:10", end_time: "2022-10-30 13:10", stage: "main"}
      const data = await controller.updateEvent("1", eventData)
      expect(data).toEqual(eventArray[0])
   })

   it("delete",async () => {
     const data = await controller.deleteEvent("1")

     expect(data).toEqual(eventArray[0])
   })
});