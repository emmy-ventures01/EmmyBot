// ==============================
//        WhatsApp Bot
//       Author: YOU
//       300+ Commands Ready
// ==============================

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@adiwajshing/baileys')
const fs = require('fs')
const path = require('path')

// Load config
const config = require('./config.json')
const prefix = config.prefix || '.'
const ownerNumber = config.ownerNumber

// Load commands dynamically
const commands = {}
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const cmd = require(`./commands/${file}`)
    Object.assign(commands, cmd)
}

// Setup auth state
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return

        let text = msg.message.conversation || msg.message.extendedTextMessage?.text
        if (!text) return
        if (!text.startsWith(prefix)) return

        const args = text.slice(prefix.length).trim().split(/ +/)
        const command = args.shift().toLowerCase()

        if (commands[command]) {
            try {
                await commands[command](sock, msg, args)
            } catch (err) {
                console.error(err)
                await sock.sendMessage(msg.key.remoteJid, { text: '❌ Error running command!' })
            }
        }
    })

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode
            console.log('Connection closed. Reason:', reason)
            if(reason !== DisconnectReason.loggedOut) startBot()
        } else if(connection === 'open') {
            console.log('✅ Bot is online!')
        }
    })
}

startBot()
