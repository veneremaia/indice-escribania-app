import {Request, Response} from 'express';

class IndexController{
   public index(req: Request, res: Response) {
        res.json({text: 'Api is /api/indice'})
    } 
}

export const indexController = new IndexController();