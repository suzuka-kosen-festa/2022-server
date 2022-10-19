import { Test, TestingModule } from '@nestjs/testing';
import { BazaarController } from './bazaar.controller';
import { BazaarService } from './bazaar.service';
import { CreateBazaarDto, UpdateBazaarDto } from './dto';

const bazaarArray  =[
   {id:1,name: "バザー1",descriptions:"説明1",image: "url1.com",group:"部活1",group_type:"eating", prices:[{price:"100円"}]},
   {id:2,name: "バザー2",descriptions:"説明2",image: "url2.com",group:"部活2",group_type:"recreation", prices:[]},
   {id:3,name: "バザー3",descriptions:"説明3",image: "url3.com",group:"部活3",group_type:"eating", prices:[]},
   {id:4,name: "バザー4",descriptions:"説明4",image: "url4.com",group:"部活4",group_type:"recreation", prices:[]},
   {id:5,name: "バザー5",descriptions:"説明5",image: "url5.com",group:"部活5",group_type:"eating", prices:[]},
]

describe('BazaarController', () => {
   let controller: BazaarController;
   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [BazaarController],
         providers: [{
            provide: BazaarService,
            useValue:{
               getAll : jest.fn().mockResolvedValue(bazaarArray),
               getByType: jest.fn().mockResolvedValue(bazaarArray.filter((data) => data.group_type === "eating")),
               getById: jest.fn().mockResolvedValue(bazaarArray[0]),
               create: jest.fn().mockResolvedValue(bazaarArray[0]),
               update: jest.fn().mockResolvedValue(bazaarArray[0]),
               delete: jest.fn().mockResolvedValue(bazaarArray[0])
            }
         }]
      }).compile();

      controller = module.get<BazaarController>(BazaarController);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });

   it("getAllBazaar", async () =>{
      const data = await controller.getAllBazaar()
      expect(data).toEqual(bazaarArray)
   })

   it("getByType", async () =>{
      const data = await controller.getBazzarByType("eating")
      expect(data).toEqual(bazaarArray.filter((data) => data.group_type === "eating"))
   })

   it("getById", async () =>{
      const data = await controller.getBazaarById("1")
      expect(data).toEqual(bazaarArray[0])
   })

   it("create", async () =>{
      const bazaarData : CreateBazaarDto = {
         name: "バザー1",
         descriptions:"説明1",
         image: "url1.com",
         group:"部活1",
         group_type:"eating"
      }
      const data = await controller.createBazaar(bazaarData)

      expect(data).toEqual(bazaarArray[0])
   })

   it("updateBazaar", async () =>{
      const bazaarData : UpdateBazaarDto = {
         name: "バザー1",
         descriptions:"説明1",
         image: "url1.com",
         group:"部活1",
         group_type:"eating"
      }
      const data = await controller.updateBazaar("1",bazaarData)
      expect(data).toEqual(bazaarArray[0])
   })

   it("deleteBazaar", async() =>{
      const data = await controller.deleteBazaar("1")

      expect(data).toEqual(bazaarArray[0])
   })
});
