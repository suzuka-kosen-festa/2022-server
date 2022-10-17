import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { SponsorcompanyService } from './sponsorcompany.service';

const sponsorComArray =[
  {id: 1, name: "会社名1"},
  {id: 2, name: "会社名2"},
  {id: 3, name: "会社名3"}
]

const singleRecord = sponsorComArray[0]



describe('SponsorcompanyService', () => {
  let service: SponsorcompanyService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SponsorcompanyService,
        {
          provide: PrismaService,
          useValue: {
            sponsorCompany :{
              create: jest.fn().mockResolvedValue(singleRecord),
              findMany: jest.fn().mockResolvedValue(sponsorComArray),
              findUnique: jest.fn().mockResolvedValue(singleRecord),
              update : jest.fn().mockResolvedValue(singleRecord),
              delete: jest.fn().mockResolvedValue(singleRecord)
            }
          }
        }
      ],
    }).compile();

    service = module.get<SponsorcompanyService>(SponsorcompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("create",async () => {
    const data = await service.create({name: "会社名1"})
    expect(data).toEqual(singleRecord)
  })

  it("getAll", async () =>{
    const data = await service.getAll()
    expect(data).toEqual(sponsorComArray)
  })

  it("getById", async () =>{
    const data = await service.getById({id : 1})
    expect(data).toEqual(singleRecord)
  })

  it("update",async () =>{
    const data = await service.update({where : {id : 1} , data :{name:"名前1"}})
    expect(data).toEqual(singleRecord)
  })

  it("delete", async () =>{
    const data = await service.delete({id : 1})
    expect(data).toEqual(singleRecord)
  })
});
