import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: false,
    },
    projectName: {
        type: String,
        required: false,
    },
    inicialInvestiment: {
        type: Number,
        required: false,
    },
    budgets: {
        type: Array,
        required: true,
    }
})

export default mongoose.model("Projects", projectSchema)