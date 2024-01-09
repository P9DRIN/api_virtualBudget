import Projects from '../models/projects.js'
import { v4 as uuid } from 'uuid'

async function index(request, response){

    try{
        const projects = await Projects.find()
        return response.status(200).json({ projects })
    }catch(err){
        response.status(500).json({ error: err.message })
    }
}

async function indexById(request, response){
    
    const { id } = request.params

    console.log(id)
        try{
            const projects = await Projects.findById(id)
            return response.status(200).json({projects})
            
        }catch(err){
            response.status(500).json({error: err.message})
        }
}

async function getProjectName(request, response){
        try{
            const project = await Projects.find(request.params)
            return response.status(200).json({ project })
        }catch(err){
            response.status(500).json({error: err.message})
        }
}

async function getBudgets(request, response){

    try{
        const projects = await Projects.find(request.params)
        // const budgets = projects.map(project => project.budgets)
        const budgets = [].concat(projects.map(project => project.budgets))
        return response.status(200).json({ budgets })
    }catch(err){
        response.status(500).json({error: err.message})
    }
}


async function store(request, response){

    const { projectName, inicialInvestiment, budgets } = request.body;

    if (!projectName){
        return response.status(400).json({ error: "Must inform a project name"})
    }

    const project = new Projects({
        _id: uuid(),
        projectName,
        inicialInvestiment,
        budgets,
    })
    try{
        await project.save();
        return response.status(201).json({ message: "Project added successfully"})
    }catch(err){
        response.status(500).json({ error: err.message })
    }
}

async function update(request, response){
    const { projectName, inicialInvestiment, budgets } = request.body;

    const { budgetName, price, category, createdAt } = budgets


    if( !projectName && !inicialInvestiment && !budgets){
        return response.status(400).json({ error: "You must inform a project name, inicial investiment or budget"})
    }
    if (projectName) response.project.projectName = projectName;
    if (inicialInvestiment) response.project.inicialInvestiment = inicialInvestiment;
    if (budgets) response.project.budgets = budgets;
    if (budgetName) response.project.budgetName = budgetName;
    if (price) response.project.price = price;
    if(category) response.project.category = category;
    if(createdAt) response.project.createdAt = createdAt;

    try{
        await response.project.save();
        return response.status(200).json({ message: "Project updated successfully"})
    }catch(err){
        response.status(500).json({ error: err.message });
    }

}

async function updateIntoBudgets(request, response){

    const { projectName, budgetName, price, category, createdAt } = request.body

    const object = {
        projectName: projectName
    }

    const projects = await Projects.findOne(object)

    let newBudget = {
        budgetName: budgetName,
        price: price,
        category: category,
        createdAt: createdAt,
    }

    projects.budgets.unshift(newBudget)

    console.log(projects)

    try{
        await projects.save();
        return response.status(200).json({ message: "Project updated successfully"})
    }catch(err){
        response.status(500).json({ error: err.message });
    }
}



async function remove(request, response){

    try{
        await response.project.deleteOne();
        return response.status(200).json({ message: 'Project deleted sucessfully' })
    } catch(err){
        return response.status(500).json({ error: err.message }) 
        
    }
}

export { 
    index, 
    indexById,
    getProjectName,
    getBudgets,
    store,
    updateIntoBudgets,
    update, 
    remove
    

}
