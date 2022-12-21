import Express, {Request, Response, NextFunction} from 'express'
import authorizationRouter from './src/routes/authorizationRoute'
import router from './src/routes/routesUsers'
import statusRoutes from './src/routes/status.routes'

const app = Express()

//configuraçoes da aplicação
app.use(Express.json())
app.use(Express.urlencoded({extended: true}));

//configuração das rotas
app.use(router)
app.use(authorizationRouter)

// Status do servidor
app.use(statusRoutes)

//inicialização servidor
app.listen(5000, () => {
    console.log('Servidor na porta 5000')
})
