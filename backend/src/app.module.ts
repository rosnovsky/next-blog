import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://gqlServer:7eQWFwCs1paMYYch@pinetype-or-us-sztbp.mongodb.net/blog', { useNewUrlParser: true, useUnifiedTopology: true }),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
