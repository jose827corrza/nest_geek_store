import { Controller, Get, Query, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @SetMetadata('isPublic', true) // se puede reemplazar por el decorador Public ya creado
  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo y libre';
  }

  @Public() // este es nuestro decorador, creado desde cero
  @Get('/ruta/')
  hello() {
    return 'con /con mi decorador/';
  }
  @Get('/tasks/')
  tasks() {
    return this.appService.getTasks();
  }
}
