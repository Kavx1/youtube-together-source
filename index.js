require("dotenv").config();

const { Client } = require("discord.js");
const fetch = require("node-fetch");
const client = new Client();
const PREFIX = "m_";

const ACTIVITIES = {
   "poker": {
       id: "755827207812677713",
       name: "Poker Night"
   },
   "youtube": {
       id: "755600276941176913",
       name: "Youtube Together"
   },
   
   "fishington": {
       id: "814288819477020702",
       name: "Fishington.io"
   }
 };
 
 client.on("ready", () => console.log("Bot is ready!"));
 client.on("warn", console.warn);
 client.on("error", console.error);
 
 client.on("message", async message => {
     if (message.author.bot || !message.guild) return;
     if (message.content.indexOf(PREFIX) !== 0) return;
     
     const args = message.content.slice(PREFIX.length).trim().split(" ");
     const cmd = args.shift().toLowerCase();
     
     if (cmd === "ping") return.message.send(`Pong! \`${client.ws.ping}ms\``);
     
     if (cmd === "yttogether") {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel || channel.type !== "voice") return.message.channel.send("Wait! | Invalid Channel Specified!");
        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE_")) return.message.channel.send("Hey! | I need `CREATE_INSTANT_INVITE` permisssion");
        
        fetch(`https://discord.com/api/v8/channels/$(channel.id)/invites`, {
           method: "POST",
           body: JSON.stringify({
               max_age: 86400,
               max_uses: 0,
               target_application_id: "755600276941176913", // youtube together
               target_type: 2,
               temporary: false,
               validate: null
           }),
           headers: {
               "Authorization": `Bot ${client.token}`,
               "Content-Type": "application/json"
           }
        })
           .then(res => res.json(}}
           .then(invite => {
              if (invite.error || !invite.code) return message.channel.send("Hmm.. | Could not start **Youtube Together**!");
              message.channel.send(`Alright! | Click here to start **Youtube Together** in $(channel.name): <https://discord.gg/${invite.code}>`);
        })
        .catch(e => {
            message.channel.send("Uhm. | Could not start **Youtube Together**!");
        })
}

// or use this
if (cmd === "activity") {
    const channel = message.guild.channels.cache.get(args[0]);
    if (!channel || channel.type !== "voice) return message.channel.send("Bruh! | Invalid Channel Specified!");
    if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("WTF DUDE | I need `CREATE_INSTANT_INVITE` permission");
    const activity = ACTIVITIES[args[1]] ? args[1].toLowerCase() : null]:
    if (!activity) return message.channel.send(`BRUH | Correct formats:\n${Object.keys(ACTIVITIES).map(m => `- **${PREFIX}activity <ChannelID> ${m}**`).join("\n")}`);
    
    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
       method: "POST",
       body: JSON.stringify({
           max_age: 86400,
           max_uses: 0,
           target_application_id: activity.id,
           target_type: 2,
           temporary: false,
           validate: null
        }),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(invite => {
                if (invite.error || !invite.code) return message.channel.send(`❌ | Could not start **${activity.name}**!`);
                message.channel.send(`✅ | Click here to start **${activity.name}** in **${channel.name}**: <https://discord.gg/${invite.code}>`);
            })
            .catch(e => {
                message.channel.send(`❌ | Could not start **${activity.name}**!`);
            })
    }
});

client.login();
   
