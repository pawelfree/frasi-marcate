import { BadRequestException, Body, Controller, Delete, Get, Headers, Param, Post, Query, UnauthorizedException } from '@nestjs/common';
import { timingSafeEqual } from 'crypto';
import { ExampleStore } from './store';
import { AiService } from './ai';

@Controller('api')
export class AppController {
  constructor(private readonly store: ExampleStore, private readonly ai: AiService) {}

  @Get('examples')
  async examples(@Query('construction') construction?: string, @Query('genre') genre?: string) {
    return (await this.store.all()).filter(x => (!construction || x.annotation.construction === construction) && (!genre || x.source.genre === genre));
  }

  @Get('examples/:id')
  example(@Param('id') id: string) { return this.store.one(id); }

  @Post('analyze')
  async analyze(@Body() body: any) {
    if (!body || typeof body.sentence !== 'string' || body.sentence.trim().length < 3 || body.sentence.length > 1000 || (body.context != null && (typeof body.context !== 'string' || body.context.length > 2000))) {
      throw new BadRequestException('Podaj zdanie (3–1000 znaków) i opcjonalny kontekst (do 2000 znaków).');
    }
    return this.ai.analyze(body.sentence, body.context || '');
  }

  @Get('admin/examples')
  adminExamples(@Headers('authorization') auth?: string) { this.authorize(auth); return this.store.all(true); }

  @Post('admin/validate')
  validate(@Headers('authorization') auth: string | undefined, @Body() body: unknown) { this.authorize(auth); return this.store.validate(body); }

  @Post('admin/examples')
  save(@Headers('authorization') auth: string | undefined, @Body() body: unknown) { this.authorize(auth); return this.store.save(body); }

  @Delete('admin/examples/:id')
  remove(@Headers('authorization') auth: string | undefined, @Param('id') id: string) { this.authorize(auth); return this.store.remove(id); }

  private authorize(header?: string) {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || expected === 'change-this-before-use' || !header?.startsWith('Basic ')) throw new UnauthorizedException('Ustaw ADMIN_PASSWORD i podaj hasło administratora.');
    let supplied = '';
    try { supplied = Buffer.from(header.slice(6), 'base64').toString('utf8').split(':').slice(1).join(':'); } catch { /* invalid header */ }
    const a = Buffer.from(supplied); const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) throw new UnauthorizedException('Niepoprawne hasło.');
  }
}
