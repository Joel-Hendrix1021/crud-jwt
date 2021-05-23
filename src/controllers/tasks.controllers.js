const crlRouter = {}

const Task = require('../models/TasksSchema')

crlRouter.renderIndex=(req, res)=>{
        res.render('index.hbs')
}

crlRouter.renderForm=(req, res)=>{
    res.render('notes/form')
}

crlRouter.renderTasks= async(req, res)=>{
    const tasks = await Task.find({userId: req.user.id}) 
    res.render('notes/tasks', {tasks})
}

crlRouter.addTask=async (req, res)=>{
    const task = new Task(req.body)
    req.flash('success_msg', 'note successfully created')
    await task.save()
    res.redirect('tasks')
}

crlRouter.deleteTask = async(req, res)=>{
    const {id} = req.params
    req.flash('success_msg', 'note successfully delete')
    const task = await Task.findByIdAndDelete(id)
    res.redirect('/tasks')
}

crlRouter.editeFormTask=async (req, res)=>{
    const {id} = req.params
    const task =  await Task.findById(id).lean()
    res.render('update', {task})
}

crlRouter.updateTask = async(req, res)=> {
    const {id}= req.params
    const task =  await Task.findByIdAndUpdate(id, req.body)
    req.flash('success_msg', 'note successfully edited')
    res.redirect('/tasks')
}

module.exports = crlRouter