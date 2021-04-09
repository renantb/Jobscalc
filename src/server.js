const express =  require("express");
const server = express();
const routes = require("./routes")
const path = require("path")

//usando template
server.set('view engine', 'ejs')

// Mudar a localizacao da pasta views
// atraves do path ele junta(join) a src com as views
server.set("views", path.join(__dirname, "views"))

// o use eh um middleware
// nesse caso ele habilita os arquivos estaticos da pasta public
server.use(express.static("public"))

//usar o req.body
// urlencoded funcao do express q libera o body
server.use(express.urlencoded({ extended: true }))

server.use(routes)

// o server eh um objeto e apos o ponto acessamos as funcionalidades dele
// o listen abre a porta 3000 na maquina para rodar algum servidor
server.listen(3000, () => console.log('🚀 Server started at port 3000!'))

