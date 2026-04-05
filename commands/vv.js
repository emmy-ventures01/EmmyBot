module.exports = {

  vv: async (sock, msg, args) => {
    try {
      const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage

      if (!quoted) {
        return await sock.sendMessage(msg.key.remoteJid, {
          text: "❌ Reply to a View Once image/video with .vv"
        })
      }

      const viewOnceMsg = quoted.viewOnceMessageV2?.message || quoted.viewOnceMessage?.message

      if (!viewOnceMsg) {
        return await sock.sendMessage(msg.key.remoteJid, {
          text: "❌ That is not a View Once message"
        })
      }

      const messageType = Object.keys(viewOnceMsg)[0]

      // Handle image
      if (messageType === 'imageMessage') {
        const buffer = await sock.downloadMediaMessage({
          message: viewOnceMsg
        })

        await sock.sendMessage(msg.key.remoteJid, {
          image: buffer,
          caption: "👁️ View Once removed by EmmyBot"
        })
      }

      // Handle video
      else if (messageType === 'videoMessage') {
        const buffer = await sock.downloadMediaMessage({
          message: viewOnceMsg
        })

        await sock.sendMessage(msg.key.remoteJid, {
          video: buffer,
          caption: "👁️ View Once removed by EmmyBot"
        })
      }

      else {
        await sock.sendMessage(msg.key.remoteJid, {
          text: "❌ Unsupported media type"
        })
      }

    } catch (err) {
      console.error(err)
      await sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Failed to process View Once message"
      })
    }
  }

}
