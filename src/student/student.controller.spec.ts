import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

describe('StudentController', () => {
   let controller: StudentController;
   let service: StudentService

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [StudentController],
         providers: [StudentService]
      }).compile();

      controller = module.get<StudentController>(StudentController);
      service = module.get<StudentService>(StudentService)
   });

   test('controller should be Defined',()=>{
      expect(controller).toBeDefined();
   })

   test('service should be Defined',()=>{
      expect(service).toBeDefined();
   })
});
