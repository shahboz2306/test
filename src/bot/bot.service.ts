import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bot } from './models/bot.model';
import { BOT_NAME } from '../app.constants';
import {
  InjectBot,
  Update,
  Ctx,
  Start,
  Help,
  On,
  Hears,
} from 'nestjs-telegraf';
import { Context, Telegraf, Markup } from 'telegraf';
import { FilesService } from '../files/files.service';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botRepo: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>,
    private readonly fileService: FilesService,
  ) {}

  private bot_id: any = process.env.BOT_ID;

  private initialize() {
    this.bot.start((ctx) => this.handleStart(ctx));
    // Add other command handlers or middleware as needed
    this.bot.launch().then(() => {
      console.log('Telegram Bot has been started.');
    });
  }

  private async handleStart(ctx: any) {
    // Handle the /start command
    // const chatId = ctx.chat.id;
    const welcomeMessage = `Welcome!`;
    await ctx.reply(welcomeMessage);
  }

  async start(ctx: Context) {
    // const user_id = ctx.from.id;
    await ctx.reply(`Welcome to our bot!`);
  }

  async onStop(ctx: Context) {
    process.exit();
  }

  async sendAudio(file_name: string, full_name: string) {
    // const currentDate = new Date(new Date().toLocaleString('uz-UZ'));

    // const formattedDate = currentDate.toLocaleString('uz-UZ', {
    //   day: '2-digit',
    //   month: '2-digit',
    //   year: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   hour12: false,
    // });

    const options: any = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Tashkent',
    };

    const currentDate = new Date().toLocaleString('en-US', options);
    // console.log(specificDate);

    const source: any = 'static/' + file_name;
    const caption: any = `
finished time: ${currentDate}
full name: ${full_name}
`;
    try {
      await this.bot.telegram.sendAudio(this.bot_id, { source }, { caption });
      await this.fileService.deleteFile(file_name);
      console.log('Audio sent successfully');
    } catch (error) {
      console.error('Error sending audio:', error);
    }
  }
}
