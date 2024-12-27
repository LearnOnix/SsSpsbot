const settings = require("./settings");
const chalk = require("chalk");
const fs = require('fs');
const path = require("path");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");
const P = require("pino");
global.packname = settings.packname;
global.author = settings.author;
global.channelLink = "https://www.whatsapp.com/channel/0029VakQoS3LSmbdEpqNrc2s";
global.ytch = "www.youtube.com/@sssps18";
const tagAllCommand = require("./commands/tagall");
const helpCommand = require("./commands/help");
const welcomeNewMembers = require("./commands/welcome");
const sayGoodbye = require("./commands/goodbye");
const banCommand = require("./commands/ban");
const promoteCommand = require("./commands/promote");
const demoteCommand = require("./commands/demote");
const muteCommand = require("./commands/mute");
const unmuteCommand = require("./commands/unmute");
const stickerCommand = require("./commands/sticker");
const isAdmin = require("./helpers/isAdmin");
const warnCommand = require("./commands/warn");
const warningsCommand = require("./commands/warnings");
const ttsCommand = require("./commands/tts");
const {
  tictactoeCommand,
  tictactoeMove
} = require("./commands/tictactoe");
const {
  incrementMessageCount,
  topMembers
} = require("./commands/topmembers");
const ownerCommand = require("./commands/owner");
const deleteCommand = require("./commands/delete");
const {
  handleAntilinkCommand,
  handleLinkDetection
} = require("./commands/antilink");
const memeCommand = require("./commands/meme");
const tagCommand = require("./commands/tag");
const jokeCommand = require("./commands/joke");
const quoteCommand = require("./commands/quote");
const factCommand = require("./commands/fact");
const weatherCommand = require("./commands/weather");
const newsCommand = require("./commands/news");
const kickCommand = require("./commands/kick");
const simageCommand = require("./commands/simage");
const attpCommand = require("./commands/attp");
const {
  startHangman,
  guessLetter
} = require("./commands/hangman");
const {
  startTrivia,
  answerTrivia
} = require("./commands/trivia");
const {
  complimentCommand
} = require("./commands/compliment");
const {
  insultCommand
} = require("./commands/insult");
const {
  eightBallCommand
} = require("./commands/eightball");
const {
  lyricsCommand
} = require("./commands/lyrics");
const {
  dareCommand
} = require("./commands/dare");
const {
  truthCommand
} = require("./commands/truth");
const {
  clearCommand
} = require("./commands/clear");
const { error } = require("console");
const dataDirectory = path.join(__dirname, "./data");
const dataFile = path.join(dataDirectory, "userGroupData.json");
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, {recursive: true});
}
let userGroupData = {
  'users': [],
  'groups': []
};
if (fs.existsSync(dataFile)) {
  userGroupData = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
} else {
  fs.writeFileSync(dataFile, JSON.stringify(userGroupData, null, 2));
}
function saveUserGroupData() {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(userGroupData, null, 2));
    console.log("Database has been updated!.");
  } catch (_0xb91bc9) {
    console.error("Error updating Databse:", _0xb91bc9);
  }
}
async function sendGlobalBroadcastMessage(_0x6efd52) {
  if (userGroupData.groups.length === 0 && userGroupData.users.length === 0) {
    return;
  }
  for (const _0x596334 of userGroupData.groups) {
    console.log("Sending broadcast to group: " + _0x596334);
    await _0x6efd52.sendMessage(_0x596334, {
      'text': "🌟 This is a global broadcast message from SsSps! Stay tuned for updates.\n✅Join our WhatsApp Channel for more bot related updates - https://whatsapp.com/channel/0029VakQoS3LSmbdEpqNrc2s"
    });
  }
  for (const _0x5b3e0b of userGroupData.users) {
    console.log("Sending broadcast to user: " + _0x5b3e0b);
    await _0x6efd52.sendMessage(_0x5b3e0b, {
      'text': "🌟 This is a global broadcast message from SsSps! Stay tuned for updates.\n✅Join our WhatsApp Channel for more bot related updates - https://whatsapp.com/channel/0029VakQoS3LSmbdEpqNrc2s"
    });
  }
}
async function startBot() {
  const {
    state: _0xb0f2fb,
    saveCreds: _0x5cc92d
  } = await useMultiFileAuthState("./auth_info");
  const _0xd110e = makeWASocket({
    'auth': _0xb0f2fb,
    'printQRInTerminal': true,
    'logger': P({
      'level': "warn"
    })
  });
  _0xd110e.ev.on("creds.update", _0x5cc92d);
  setInterval(async () => {
    if (_0xd110e) {
      await sendGlobalBroadcastMessage(_0xd110e);
    }
  }, 43200000);
  _0xd110e.ev.on("messages.upsert", async _0xcb023 => {
    const _0x5187ec = _0xcb023.messages[0];
    const _0x5daaed = _0x5187ec.key.remoteJid;
    const _0x3713f1 = _0x5187ec.key.participant || _0x5187ec.key.remoteJid;
    if (!_0x5187ec.message) {
      return;
    }
    const _0x1a8d4b = _0x5daaed.endsWith("@g.us");
    if (_0x1a8d4b) {
      if (!userGroupData.groups.includes(_0x5daaed)) {
        userGroupData.groups.push(_0x5daaed);
        console.log("Database updated: " + _0x5daaed);
        saveUserGroupData();
      }
    } else if (!userGroupData.users.includes(_0x5daaed)) {
      userGroupData.users.push(_0x5daaed);
      console.log("Database updated: " + _0x5daaed);
      saveUserGroupData();
    }
    let _0x16ea0d = _0x5187ec.message?.["conversation"]?.["trim"]()["toLowerCase"]() || _0x5187ec.message?.["extendedTextMessage"]?.["text"]?.["trim"]()["toLowerCase"]() || '';
    _0x16ea0d = _0x16ea0d.replace(/\.\s+/g, '.').trim();
    if (!_0x1a8d4b && (_0x16ea0d === 'hi' || _0x16ea0d === "hello" || _0x16ea0d === "bot")) {
      await _0xd110e.sendMessage(_0x5daaed, {
        'text': "Hi, How can I help you?\nYou can use .menu for more info and commands.\n\n ✅Join - https://whatsapp.com/channel/0029VakQoS3LSmbdEpqNrc2s"
      });
      return;
    }
    if (!_0x16ea0d.startsWith('.')) {
      return;
    }
    const _0x59d2fc = [".mute", ".unmute", ".ban", ".promote", ".demote", ".kick", ".tagall", ".antilink"];
    const _0x156455 = _0x59d2fc.some(_0x162eb8 => _0x16ea0d.startsWith(_0x162eb8));
    let _0x57d623 = false;
    let _0x3b0e75 = false;
    if (_0x1a8d4b && _0x156455) {
      const _0x4a9b24 = await isAdmin(_0xd110e, _0x5daaed, _0x3713f1);
      _0x57d623 = _0x4a9b24.isSenderAdmin;
      _0x3b0e75 = _0x4a9b24.isBotAdmin;
      if (!_0x3b0e75) {
        await _0xd110e.sendMessage(_0x5daaed, {
          'text': "Please make the bot an admin to use admin commands."
        });
        return;
      }
      if (_0x16ea0d.startsWith(".mute") || _0x16ea0d === ".unmute" || _0x16ea0d.startsWith(".ban") || _0x16ea0d.startsWith(".promote") || _0x16ea0d.startsWith(".demote")) {
        if (!_0x57d623 && !_0x5187ec.key.fromMe) {
          await _0xd110e.sendMessage(_0x5daaed, {
            'text': "Sorry, only group admins can use this command."
          });
          return;
        }
      }
      if (_0x16ea0d.startsWith(".promote")) {
        const _0x1ab4f3 = _0x5187ec.message.extendedTextMessage?.["contextInfo"]?.["mentionedJid"] || [];
        await promoteCommand(_0xd110e, _0x5daaed, _0x1ab4f3);
      } else {
        if (_0x16ea0d.startsWith(".demote")) {
          const _0x20e919 = _0x5187ec.message.extendedTextMessage?.["contextInfo"]?.["mentionedJid"] || [];
          await demoteCommand(_0xd110e, _0x5daaed, _0x20e919);
        }
      }
    }
    if (!_0x5187ec.key.fromMe) {
      incrementMessageCount(_0x5daaed, _0x3713f1);
    }
    switch (true) {
      case _0x16ea0d === ".simage":
        {
          const _0x21c587 = _0x5187ec.message?.["extendedTextMessage"]?.["contextInfo"]?.["quotedMessage"];
          if (_0x21c587?.["stickerMessage"]) {
            await simageCommand(_0xd110e, _0x21c587, _0x5daaed);
          } else {
            await _0xd110e.sendMessage(_0x5daaed, {
              'text': "Please reply to a sticker with the .simage command to convert it."
            });
          }
          break;
        }
      case _0x16ea0d.startsWith(".kick"):
        const _0x262b7d = _0x5187ec.message.extendedTextMessage?.["contextInfo"]?.["mentionedJid"] || [];
        if (_0x262b7d.length > 0) {
          await kickCommand(_0xd110e, _0x5daaed, _0x3713f1, _0x262b7d, _0x5187ec.message?.["extendedTextMessage"]?.["contextInfo"]);
        } else {
          await _0xd110e.sendMessage(_0x5daaed, {
            'text': "Please mention a user to kick."
          });
        }
        break;
      case _0x16ea0d.startsWith(".mute"):
        const _0x556b33 = parseInt(_0x16ea0d.split(" ")[1]);
        if (isNaN(_0x556b33)) {
          await _0xd110e.sendMessage(_0x5daaed, {
            'text': "Please provide a valid number of minutes."
          });
        } else {
          await muteCommand(_0xd110e, _0x5daaed, _0x3713f1, _0x556b33);
        }
        break;
      case _0x16ea0d === ".unmute":
        await unmuteCommand(_0xd110e, _0x5daaed, _0x3713f1);
        break;
      case _0x16ea0d.startsWith(".ban"):
        const _0x189580 = _0x5187ec.message.extendedTextMessage?.["contextInfo"]?.["mentionedJid"] || [];
        if (_0x189580.length > 0) {
          await banCommand(_0xd110e, _0x5daaed, _0x3713f1, _0x189580);
        } else {
          await _0xd110e.sendMessage(_0x5daaed, {
            'text': "Please mention users to ban."
          });
        }
        break;
      case _0x16ea0d === ".help" || _0x16ea0d === ".menu" || _0x16ea0d === ".bot" || _0x16ea0d === ".list":
        await helpCommand(_0xd110e, _0x5daaed, global.channelLink);
        break;
      case _0x16ea0d.startsWith(".sticker") || _0x16ea0d.startsWith('.s'):
        await stickerCommand(_0xd110e, _0x5daaed, _0x5187ec);
        break;
      case _0x16ea0d.startsWith(".warnings"):
        const _0x1546ec = _0x5187ec.message.extendedTextMessage?.["contextInfo"]?.["mentionedJid"] || [];
        await warningsCommand(_0xd110e, _0x5daaed, _0x1546ec);
        break;
      case _0x16ea0d.startsWith(".warn"):
        const _0x207a52 = _0x5187ec.message.extendedTextMessage?.["contextInfo"]?.["mentionedJid"] || [];
        await warnCommand(_0xd110e, _0x5daaed, _0x3713f1, _0x207a52);
        break;
      case _0x16ea0d.startsWith(".tts"):
        const _0x200695 = _0x16ea0d.slice(4).trim();
        await ttsCommand(_0xd110e, _0x5daaed, _0x200695);
        break;
      case _0x16ea0d === ".delete" || _0x16ea0d === ".del":
        await deleteCommand(_0xd110e, _0x5daaed, _0x5187ec, _0x3713f1);
        break;
      case _0x16ea0d.startsWith(".attp"):
        await attpCommand(_0xd110e, _0x5daaed, _0x5187ec);
        break;
      case _0x16ea0d === ".owner":
        await ownerCommand(_0xd110e, _0x5daaed);
        break;
      case _0x16ea0d === ".tagall":
        if (_0x57d623 || _0x5187ec.key.fromMe) {
          await tagAllCommand(_0xd110e, _0x5daaed, _0x3713f1);
        } else {
          await _0xd110e.sendMessage(_0x5daaed, {
            'text': "Sorry, only group admins can use the .tagall command."
          });
        }
        break;
      case _0x16ea0d.startsWith(".tag"):
        const _0x50f284 = _0x16ea0d.slice(4).trim();
        const _0x396d07 = _0x5187ec.message?.["extendedTextMessage"]?.["contextInfo"]?.["quotedMessage"] || null;
        await tagCommand(_0xd110e, _0x5daaed, _0x3713f1, _0x50f284, _0x396d07);
        break;
      case _0x16ea0d.startsWith(".antilink"):
        await handleAntilinkCommand(_0xd110e, _0x5daaed, _0x16ea0d, _0x3713f1, _0x57d623);
        break;
      case _0x16ea0d === ".meme":
        await memeCommand(_0xd110e, _0x5daaed);
        break;
      case _0x16ea0d === ".joke":
        await jokeCommand(_0xd110e, _0x5daaed);
        break;
      case _0x16ea0d === ".quote":
        await quoteCommand(_0xd110e, _0x5daaed);
        break;
      case _0x16ea0d === ".fact":
        await factCommand(_0xd110e, _0x5daaed);
        break;
      case _0x16ea0d.startsWith(".weather"):
        const _0x43be87 = _0x16ea0d.slice(9).trim();
        if (_0x43be87) {
          await weatherCommand(_0xd110e, _0x5daaed, _0x43be87);
        } else {
          await _0xd110e.sendMessage(_0x5daaed, {
            'text': "Please specify a city, e.g., .weather London"
          });
        }
        break;
      case _0x16ea0d === ".news":
        await newsCommand(_0xd110e, _0x5daaed);
        break;
      case _0x16ea0d.startsWith(".tictactoe"):
        const _0xd4f26a = _0x5187ec.message.extendedTextMessage?.["contextInfo"]?.["mentionedJid"] || [];
        if (_0xd4f26a.length === 1) {
          const _0x537804 = _0xd4f26a[0];
          tictactoeCommand(_0xd110e, _0x5daaed, _0x3713f1, _0x537804, _0x1a8d4b);
        } else {
          await _0xd110e.sendMessage(_0x5daaed, {
            'text': "Please mention one player to start a game of Tic-Tac-Toe."
          });
        }
        break;
      case _0x16ea0d.startsWith(".move"):
        const _0x2c5b00 = parseInt(_0x16ea0d.split(" ")[1]);
        if (isNaN(_0x2c5b00)) {
          await _0xd110e.sendMessage(_0x5daaed, {
            'text': "Please provide a valid position number for Tic-Tac-Toe move."
          });
        } else {
          tictactoeMove(_0xd110e, _0x5daaed, _0x3713f1, _0x2c5b00);
        }
        break;
      case _0x16ea0d === ".topmembers":
        topMembers(_0xd110e, _0x5daaed, _0x1a8d4b);
        break;
      case _0x16ea0d.startsWith(".hangman"):
        startHangman(_0xd110e, _0x5daaed);
        break;
      case _0x16ea0d.startsWith(".guess"):
        const _0xd0450f = _0x16ea0d.split(" ")[1];
        if (_0xd0450f) {
          guessLetter(_0xd110e, _0x5daaed, _0xd0450f);
        } else {
          _0xd110e.sendMessage(_0x5daaed, {
            'text': "Please guess a letter using .guess <letter>"
          });
        }
        break;
      case _0x16ea0d.startsWith(".trivia"):
        startTrivia(_0xd110e, _0x5daaed);
        break;
      case _0x16ea0d.startsWith(".answer"):
        const _0x5bb189 = _0x16ea0d.split(" ").slice(1).join(" ");
        if (_0x5bb189) {
          answerTrivia(_0xd110e, _0x5daaed, _0x5bb189);
        } else {
          _0xd110e.sendMessage(_0x5daaed, {
            'text': "Please provide an answer using .answer <answer>"
          });
        }
        break;
      case _0x16ea0d.startsWith(".compliment"):
        const _0x3577ef = _0x5187ec.message.extendedTextMessage?.["contextInfo"]?.["mentionedJid"][0];
        await complimentCommand(_0xd110e, _0x5daaed, _0x3577ef);
        break;
      case _0x16ea0d.startsWith(".insult"):
        const _0x513ef0 = _0x5187ec.message.extendedTextMessage?.["contextInfo"]?.["mentionedJid"][0];
        await insultCommand(_0xd110e, _0x5daaed, _0x513ef0);
        break;
      case _0x16ea0d.startsWith(".8ball"):
        const _0x4b17e0 = _0x16ea0d.split(" ").slice(1).join(" ");
        await eightBallCommand(_0xd110e, _0x5daaed, _0x4b17e0);
        break;
      case _0x16ea0d.startsWith(".lyrics"):
        const _0x52b947 = _0x16ea0d.split(" ").slice(1).join(" ");
        await lyricsCommand(_0xd110e, _0x5daaed, _0x52b947);
        break;
      case _0x16ea0d === ".dare":
        await dareCommand(_0xd110e, _0x5daaed);
        break;
      case _0x16ea0d === ".truth":
        await truthCommand(_0xd110e, _0x5daaed);
        break;
      case _0x16ea0d === ".clear":
        if (_0x1a8d4b) {
          await clearCommand(_0xd110e, _0x5daaed);
        }
        break;
      default:
        await handleLinkDetection(_0xd110e, _0x5daaed, _0x5187ec, _0x16ea0d, _0x3713f1);
        break;
    }
  });
  _0xd110e.ev.on("group-participants.update", async _0x5545c9 => {
    const _0x51deba = _0x5545c9.id;
    const _0x48fc5c = _0xd110e.user.id.split(':')[0] + "@s.whatsapp.net";
    try {
      if (_0x5545c9.action === "remove") {
        const _0x48aec7 = _0x5545c9.participants;
        if (_0x48aec7.includes(_0x48fc5c)) {
          console.log("Bot has been removed from group: " + _0x51deba);
          userGroupData.groups = userGroupData.groups.filter(_0xa77dc7 => _0xa77dc7 !== _0x51deba);
          saveUserGroupData();
        } else {
          if (_0x48aec7.length > 0) {
            await sayGoodbye(_0xd110e, _0x51deba, _0x48aec7);
          }
        }
      } else {
        if (_0x5545c9.action === "add") {
          const _0x3488ae = _0x5545c9.participants;
          if (_0x3488ae.length > 0) {
            await welcomeNewMembers(_0xd110e, _0x51deba, _0x3488ae);
          }
        }
      }
    } catch (_0x747c0c) {
      console.error("Error handling group update:", _0x747c0c);
    }
  });
  _0xd110e.ev.on("connection.update", async _0x12322e => {
    const {
      connection: _0x4b0f0c,
      lastDisconnect: _0x17a7ea
    } = _0x12322e;
    if (_0x4b0f0c === "close") {
      const _0x4bb5c7 = _0x17a7ea.error?.["output"]?.["statusCode"] !== DisconnectReason.loggedOut;
      if (_0x4bb5c7) {
        await startBot();
      } else {
        console.log(chalk.red("Logged out from WhatsApp. Please restart the bot and scan the QR code again."));
      }
    } else {
      if (_0x4b0f0c === "open") {
        console.log(chalk.green("Connected to WhatsApp!"));
        const _0x403870 = _0xd110e.user.id;
        await _0xd110e.sendMessage(_0x403870, {
          'text': "🎉 Congrats! The bot has been connected successfully.\n➡Join WhatsApp channel - https://whatsapp.com/channel/0029VakQoS3LSmbdEpqNrc2s\n➡Bot Tutorial - www.youtube.com/@sssps18\n➡Telegram - https://t.me/studyhubss1\n------------------"
        });
      }
    }
  });
}
startBot();
