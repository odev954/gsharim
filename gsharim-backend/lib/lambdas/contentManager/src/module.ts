import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksController } from '@controllers/tasksController';
import { TaskCrudService } from '@services/taskCrudService';
import DynamoTasksDatabase from '@databases/dynamoDB/dynamoTasksDatabase';
import { consts } from '@consts';
import { SectionsCrudService } from '@services/sectionsCrudService';
import DynamoSectionsDatabase from '@databases/dynamoDB/dynamoSectionsDatabase';
import DynamoSectionGroupDatabase from '@databases/dynamoDB/dynamoSectionsGroupDatabase';
import { SectionsController } from '@controllers/sectionsController';
import { LoggerMiddleware } from '@middlewares/loggerMiddleware';

@Module({
    imports: [],
    controllers: [TasksController, SectionsController],
    providers: [
        TaskCrudService,
        {
            provide: consts.TasksDatabaseInjectToken,
            useClass: DynamoTasksDatabase
        },
        SectionsCrudService,
        {
            provide: consts.SectionsDatabaseInjectToken,
            useClass: DynamoSectionsDatabase
        },
        {
            provide: consts.SectionsGroupDatabaseInjectToken,
            useClass: DynamoSectionGroupDatabase
        }
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(SectionsController);
        consumer.apply(LoggerMiddleware).forRoutes(TasksController);
    }
}
