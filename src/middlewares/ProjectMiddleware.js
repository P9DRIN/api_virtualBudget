import { validate as isUuid } from 'uuid'
import Projects from '../models/projects.js'

async function validateId(request, response, next){
    
    const{ id } = request.params;

    if(!isUuid(id)){
        return next('route')
    }
    try{
            const project = await Projects.findById(id);
            response.project = project;
            if(!project) {
                return response.status(404).json({ error: 'product not found!' })
            }
        }catch(err){
            
            return response.status(500).json({ error: err.message });
        }
        next();
    }

export {
    validateId,

}