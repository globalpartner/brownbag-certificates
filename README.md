Gerador de Certificados - BrownBag - GlobalPartner.io
------------------------------------
[![Build Status](http://jenkins.codeprestige.com.br/buildStatus/icon?job=GlobalPartner%2FBrownBag-Certificates)](http://jenkins.codeprestige.com.br/job/GlobalPartner/job/BrownBag-Certificates)

## Arquitetura

A aplicação foi arquiteturada da seguinte maneira:

### Banco de Dados
É utilizado o MongoDB como BD.  
O dados ficarão dividos em 3 collections: uma para informações do curso, outra para os participantes e outra para as solicitações de certificado.

1. `courses`
2. `students`
3. `printorders`

### Geração de Certificados
À partir de uma página púbica para a geração dos certificados, o aluno irá colocar o seu e-mail e selecionar o curso que ele fez. Selecionando, ele irá clicar no botão de gerar certificado.

O sistema irá verificar:
1. Se o e-mail (ou dado inserido) é válido.
2. Se o aluno esteve presente no curso selecionado.
3. Se o aluno foi aprovado no curso.

Se os três requisitos forem atendidos, o certificado é gerado em PDF para o alunos baixar.

### Certificados
A certificação é gerada através da tecnologia de conversão de HTML para PDF.  
Utilizando o HTML como template, alguns dados com o nome dos alunos, instrutores, curso e afins são preenchidos com os dados cadastrados, e à partir desse html é gerado o pdf.

### Popular dados
Para evitar ter que ficar criando telas administrativas (inicialmente), o cadastro é feito manualmente.

## Desenvolvimento

O projeto é feito em Node com Express. Há algumas outras ferramentas embutidas que vão facilitar a nossa vida:

1. [config-yml](https://www.npmjs.com/package/config-yml): Este pacote permite que façamos configurações gerais em um arquivo `config.yml`.
2. [express-pdf](https://github.com/tanhauhau/express-pdf): Este é responsável por fazer as conversões de HTML para PDF. Esse pacote é uma abstração do [html-pdf](https://github.com/marcbachmann/node-html-pdf)
3. [mustache](https://github.com/bryanburgers/node-mustache-express): Engine template. Facilita a geração de HTML com _placeholders_.
4. [CSRF](https://github.com/expressjs/csurf): Validação de request por token. É uma camada de segurança bacana.

Para subir o projeto, basta executar: 
```
docker-compose up -d
npm start
# ou para subir com o nodemon
npm run start-dev
```
