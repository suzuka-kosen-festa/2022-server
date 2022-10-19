import { Test, TestingModule } from '@nestjs/testing';
import { BazaarpricesController } from './bazaarprices.controller';
import { BazaarpricesService } from './bazaarprices.service';

const pricesArray = [
   {id : 1, prices: "値段100円", bazaarId: 1},
   {id : 2, prices: "値段200円", bazaarId: 2},
   {id : 3, prices: "値段140円", bazaarId: 3},
   {id : 4, prices: "値段150円", bazaarId: 4},
   {id : 5, prices: "値段110円", bazaarId: 5}
]

describe('BazaarpricesController', () => {
   let controller: BazaarpricesController;

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [BazaarpricesController],
         providers: [{
            provide : BazaarpricesService,
            useValue:{
               getAll: jest.fn().mockResolvedValue(pricesArray),
               getById : jest.fn().mockResolvedValue(pricesArray[0]),
               update : jest.fn().mockResolvedValue(pricesArray[0]),
               delete : jest.fn().mockResolvedValue(pricesArray[0])
            }
         }]
      }).compile();

      controller = module.get<BazaarpricesController>(BazaarpricesController);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });

   it('getAllBazaar', async () =>{
      const data = await controller.getAllBazaarPrices()
      expect(data).toEqual(pricesArray)
   })

   it("getById", async () =>{
      const data = await controller.getBazaarPricesById("1")

      expect(data).toEqual(pricesArray[0])
   })

   it("update", async ()=>{
      const data = await controller.updateBazaarPrices("1", {price : "1"})

      expect(data).toEqual(pricesArray[0])
   })

   it("delete", async () =>{
      const data = await controller.deleteBazaarPrices("1")

      expect(data).toEqual(pricesArray[0])
   })
});
