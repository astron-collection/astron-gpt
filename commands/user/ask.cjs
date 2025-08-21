const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch'); // npm install node-fetch@2

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask something to Astron GPT')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Your question to Astron GPT')
                .setRequired(true)
        ),
    async execute(interaction) {
        const question = interaction.options.getString('question');

        await interaction.deferReply();

        try {
            // 🔧 Ici tu remplaces par ton endpoint Astron GPT ou ton API backend
            const response = await fetch('https://api.astron-collection.com/v1/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: question }),
            });

            const data = await response.json();

            await interaction.editReply({
                content: `🤖 **Astron GPT**: ${data.answer || "No response."}`
            });
        } catch (err) {
            console.error(err);
            await interaction.editReply('❌ An error occurred while asking Astron GPT.');
        }
    },
};
