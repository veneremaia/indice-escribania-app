import {Request, Response} from 'express';
import pool from '../database';

class IndiceController{
    public async list(req: Request, res: Response) {
        const indices = await pool.query('SELECT * FROM indice');
        res.json(indices); 
    } 


    public async getOne(req: Request, res: Response) : Promise<any> {
        const {id} = req.params;
        const indice = await pool.query('SELECT * FROM indice WHERE id=?',[id]);
        if(indice.length>0)
            return res.json(indice[0]);
        res.status(404).json({text: 'El indice no existe'}); 
        } 

    public async create(req : Request,res: Response) : Promise<void>{
        await pool.query('INSERT INTO indice set?',[req.body]);
        res.json({message: 'Indice guardado con exito'});
    }

    public async delete(req: Request, res : Response) : Promise<void>{
        const { id }=req.params;
        await pool.query('DELETE FROM indice WHERE id = ?',[id])
        res.json({message: 'El inidice con id '+id+' fue eliminado'})
    }
    public async update(req: Request, res : Response): Promise<void>{
        const { id }=req.params;
        await pool.query('UPDATE indice set ? WHERE id=?',[req.body, id])
        res.json({message: 'El inidice con id '+id+' fue actualizado'})

    }
}

const indiceController = new IndiceController();
export default indiceController; 