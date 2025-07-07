const venom = require('venom-bot');
const axios = require('axios');

const URL_PLANILHA = 'https://script.google.com/macros/s/AKfycbxCPKf29X-VXoxmmTl9ijX-GgYFy8SraZ3pAtuVh5DpWRq7U4WFvrKLVBN9jQQwnzbobw/exec'; 

venom
  .create({
    session: 'vencimentos-maxplay', // nome da sessão
  })
  .then((client) => start(client))
  .catch((error) => console.error('Erro ao iniciar o bot:', error));

async function start(client) {
  try {
    const { data } = await axios.get(URL_PLANILHA);

    if (data.length === 0) {
      console.log('Nenhum cliente vencido encontrado.');
      return;
    }

    for (let cliente of data) {
      const mensagem = 
`🔔 *Lembrete de Vencimento - MaxPlay TV* 🔔

👤 *Nome:* ${cliente.nome}
📅 *Vencimento:* ${cliente.vencimento}
💰 *Valor:* ${cliente.valor}

Para renovar sua assinatura, envie o valor via *PIX* para:

🔑 *Chave PIX:* 11980194935

📩 Após o pagamento, envie o comprovante por aqui mesmo.

Agradecemos por escolher a *MaxPlay TV*! 🚀📺`;

      try {
        await client.sendText(`${cliente.telefone}@c.us`, mensagem);
        console.log(`✅ Mensagem enviada para ${cliente.nome}`);
      } catch (err) {
        console.log(`❌ Erro ao enviar para ${cliente.nome}:`, err);
      }
    }
  } catch (erro) {
    console.error('Erro ao buscar dados da planilha:', erro);
  }
}
