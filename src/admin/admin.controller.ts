import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly service : AdminService){}

    @Get("test")
    async test() : Promise<string> {
        return "hello"
    }


    @Get("/studentguest")
    async exportStudentGuest() : Promise<any>{
        return this.service.exportStudentGuestUuid()
    }
}
