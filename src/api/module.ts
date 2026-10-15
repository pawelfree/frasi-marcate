import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AppController } from "./routes";
import { ExampleStore } from "./store";
import { AiService } from "./ai";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "dist", "web"),
      exclude: ["/api*"],
    }),
  ],
  controllers: [AppController],
  providers: [ExampleStore, AiService],
})
export class AppModule {}
