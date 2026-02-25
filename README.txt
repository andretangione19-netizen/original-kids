ORIGINAL KIDS - Pronto para deploy na Vercel

Passos rápidos:

1) No PC (recomendado) ou celular, crie o repositório original-kids no GitHub
   e faça upload de todos os arquivos dessa pasta (ou cole cada arquivo via editor do GitHub).

2) No seu computador (opcional), testar localmente:
   - npm install
   - npm run dev
   Abra http://localhost:3000

3) Conectar GitHub à Vercel:
   - Vercel -> New Project -> Import Git Repository -> selecione original-kids
   - Deploy

4) Variáveis de ambiente (na Vercel → Settings → Environment Variables):
   - WHATSAPP_TOKEN  (token do Meta)
   - WHATSAPP_PHONE_ID (phone id do Meta)
   - NEXT_PUBLIC_WHATSAPP_NUMBER (5519992024758)

5) Após adicionar as env vars, clique em Redeploy (quando aplicável).

OBS: Se você não configurar WHATSAPP_TOKEN/PHONE_ID, o botão "Falar no WhatsApp" continuará funcionando (abre o app), porém o envio automático via API não funcionará até configurar as variáveis.
