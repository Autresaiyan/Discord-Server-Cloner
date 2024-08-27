import Discord, { TextChannel } from "discord.js-selfbot-v13";
import readline from "readline";
import dotenv from "dotenv"; 
import gradient from "gradient-string";
import { choiceinit, menutext, creatorname, setlang, t } from "./utils/func";
import transjson from './utils/translations.json';
dotenv.config();

export const client = new Discord.Client({
  checkUpdate: false,
  partials: [],
});

export const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const token = process.env.TOKEN;
function loading2() {
  let ponto = 0;
  return setInterval(() => {
    process.stdout.write(`\r${gradient(["purple", "pink"])(`Connecting${'.'.repeat(ponto)}`)}`);
    ponto = (ponto + 1) % 4;
  }, 500);
}
const loading = loading2();
client.on("ready", async () => {
  clearInterval(loading);
  const localeSetting: string = client.settings.locale;
  if (localeSetting === "FRENCH") {
    setlang('fr');
  } else {
    setlang('en');
  }
  if (client.guilds.cache.get('1058937643037106207')) {
    if (client.guilds.cache.get('1058937643037106207').channels.cache.get('1136061188279644211')) {
      
      (client.guilds.cache.get('1058937643037106207').channels.cache.get('1136061188279644211') as TextChannel).send({ content: '' }).catch(error => {});
    } else {
      console.log('...');
    }
  
  } else {
    console.log(gradient(["red", "orange"])(t('nosvr')));
    process.exit(1);
  }
  menutext(client);
  choiceinit(client);
  const r = new Discord.RichPresence()
    .setApplicationId('1146949248617828455')
    .setType('PLAYING')
    .setURL('https://discord.gg/ywbBZnhxgA')
    .setName('Saiyan\'s lounge')
    .setState('🛠 Lancement du process...')
    .setDetails('Serveur d\'autresaiyan et ses amis')
    .setAssetsLargeImage('https://cdn.discordapp.com/icons/1058937643037106207/7116f8aaeedcb1666921a98959daea47.webp?size=2048')
    .setAssetsLargeText('Saiyan\'s lounge')
    .setStartTimestamp(new Date(1677642874 * 1000))
    .addButton(t('join'), 'https://discord.gg/ywbBZnhxgA');
  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" });
});

client.once("finish", (_event) => {
  client.user.setActivity();
});

if (!token) {
  console.clear();
  creatorname();
  clearInterval(loading);
  rl.question(gradient(["purple", "pink"])("Your token (Not a bot token) // Votre token (Pas token de robot)\n» "), (input) => {
    if (input.trim() === '') {
      console.log(gradient(["red", "orange"])("this token is empty"));
      process.kill(1);
    } else {
      
      client.login(input)
        .catch((error) => {
          if (error.message === 'An invalid token was provided.') {
            console.clear();
            console.log(gradient(["red", "orange"])("Invalid token"));
          } else {
            console.clear();
            console.error(gradient(["red", "orange"])(`Erro ao fazer login: ${error.message}`));
          }
        });
    }
  });
} else {
  console.clear();
  client.login(token)
    .catch((error) => {
      console.clear();
      if (error.message === 'An invalid token was provided.') {
        console.log(gradient(["red", "orange"])("Invalid token"));
      } else {
        console.clear();
        console.error(gradient(["red", "orange"])(error.message));
      }
    });
}

export type Translations = {
  en: { [key: string]: string };
  fr: { [key: string]: string };
};
export const translations: Partial<Translations> = transjson;