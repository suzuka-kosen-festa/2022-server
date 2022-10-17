import { Test, TestingModule } from '@nestjs/testing';
import { SponsorService } from '../sponsor/sponsor.service';
import { SponsorcompanyController } from './sponsorcompany.controller';


const sponsorComArray =[
  {id: 1, name: "会社名1"},
  {id: 2, name: "会社名2"},
  {id: 3, name: "会社名3"}
]

const singleRecord = sponsorComArray[0]

describe('SponsorcompanyController', () => {
  let controller: SponsorcompanyController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SponsorcompanyController],
      providers: [{
        provide: SponsorService,
        useValue:{
          getAll: jest.fn().mockResolvedValue(sponsorComArray),
          getById: jest.fn().mockResolvedValue(singleRecord),
          delete : jest.fn().mockResolvedValue(singleRecord),
          update: jest.fn().mockResolvedValue(singleRecord),
          create: jest.fn().mockResolvedValue(singleRecord)
        }
      }]
    }).compile();

    controller = module.get<SponsorcompanyController>(SponsorcompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("createSponsorCom", async () =>{
    const data = await controller.createSponsorCom({name : "名前1"})
    expect(data).toEqual(singleRecord)
  })

  it("getAllSponsorCom", async () =>{
    const data = await controller.getAllSponsorCom()
    expect(data).toEqual(sponsorComArray)
  })

  it("getSponsorCom", async () =>{
    const data = await controller.getSponsorCom("1")
    expect(data).toEqual(singleRecord)
  })

  it("updateSponsorCom", async () =>{
    const data = await controller.updateSponsorCom("1",{name: "名前1"})
    expect(data).toEqual(singleRecord)
  })

  it("deleteSponsorCom", async () =>{
    const data = await controller.deleteSponsorCom("1")
    expect(data).toEqual(singleRecord)
  })
});
