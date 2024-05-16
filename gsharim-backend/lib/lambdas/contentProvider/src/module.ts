import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TaskController } from '@controllers/taskController';
import { TaskService } from '@services/taskService';
import consts from '@consts';
import HttpContentManagerCommunicator from '@api/content/httpContentComunicator';
import HttpSectionManagerCommunicator from '@api/sections/httpSectionManagerCommunicator';
import { LoggerMiddleware } from '@middlewares/loggerMiddleware';

@Module({
    imports: [],
    controllers: [TaskController],
    providers: [
        TaskService,
        {
            provide: consts.contentManagerInjectToken,
            useClass: HttpContentManagerCommunicator
        },
        {
            provide: consts.sectionManagerInjectToken,
            useClass: HttpSectionManagerCommunicator
        }
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(TaskController);
    }
}
