import {Router} from 'express';
import indiceController from '../controllers/indiceController';

class indiceRoutes{
    public router : Router = Router();

    constructor(){
            this.config();
    }

    config () : void{
        this.router.get('/',indiceController.list);
        this.router.get('/:id',indiceController.getOne);
        this.router.post('/',indiceController.create);    
        this.router.delete('/:id',indiceController.delete);
        this.router.put('/:id',indiceController.update);

}
}
const indiceRoute = new indiceRoutes();
export default indiceRoute.router;