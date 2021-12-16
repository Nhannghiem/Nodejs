const express = require('express');
const req = require('express/lib/request');
const { render, redirect } = require('express/lib/response');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
const app = express()

const {ObjectId, MongoClient} = require('mongodb')
const url = 'mongodb://localhost:27017';

app.set('view engine', 'hbs');
app.use(express.urlencoded({extended:true}))
app.use(express.static('body'))

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/courses', async(req,res)=> {
    
    const client = await MongoClient.connect(url);
    const dbo = client.db("TrainerManagement");
    const allCourse =await dbo.collection("courses").find({}).toArray();
    res.render('course',{data:allCourse})

})
app.get('/studentPass', async(req,res)=> {
    
    const client = await MongoClient.connect(url);
    const dbo = client.db("TrainerManagement");
    const allCourse =await dbo.collection("courses").find({}).toArray();
    res.render('studentPass',{pass:allCourse})

})

app.get('/view', async(req,res)=> {
    const id = req.query.id;
    console.log(id)

    const client = await MongoClient.connect(url);
    const dbo = client.db("TrainerManagement");
 
    const deatail = await dbo.collection("students").find({course_id: id}).toArray()
    // const allStudent = await dbo.collection("students").find().toArray()
    // res.render('viewStudent',{courseDeateil: deatail,students: allStudent})
    res.render('viewStudent',{courseDeateil:deatail})
})


app.get('/indexStudent',(req,res)=>{
    
    // const client = await MongoClient.connect(url);
    // const dbo = client.db("TrainerManagement");
    // const allCourse =await dbo.collection("courses").find({}).toArray();
    // res.render('course',{data:allCourse})
    res.render('indexStudent')
    
})
app.get('/home', (req,res)=>{
    res.render('home')
})
app.get('/grades', (req,res)=>{
    res.render('grades')
})
app.get('/studentPass',(req,res)=>{
    res.render('studentPass')
})

app.post('/indexStudent', async(req,res)=>{
    const inputName = req.body.txtName;
    const inputAge = req.body.txtAge;
    const inputCourseId = req.body.txtCourseid;
    
    const vaule = {name: inputName, age: inputAge, course_id: inputCourseId}

    const client = await MongoClient.connect(url);
    const dbo = client.db("TrainerManagement");
    await dbo.collection("students").insertOne(vaule)
    res.redirect('back')
})

app.get('/delete', async(req,res)=> {
    const deleteStudent = req.query.id
    
    const client = await MongoClient.connect(url);
    const dbo = client.db("TrainerManagement");
    await dbo.collection("students").deleteOne({"_id":ObjectId(deleteStudent)})

    res.redirect('back')
})

// app.post('/index',async (req,res)=>{
//     const studentId = req.body.txtStudentId
//     const courseId = req.body.txtCourseId
//     const courseStudent = {
//         studentId: studentId,
//         courseId: courseId,
//     }
//     const client = await MongoClient.connect(url);
//     const dbo = client.db("TrainerManagement");
//     await dbo.collection('coursesStudent').insertOne(courseStudent)

//     res.redirect('/admin')
// })

// app.get('/assginStudent', async(req,res)=>{ 
//     const client = await MongoClient.connect(url);
//     const dbo = client.db("TrainerManagement");
 
//     const studentId = new ObjectId(req.query.id)
//     const
//     dbo.collection("students").updateOne(
//         {_id:studentId},
//         {$set: {course_id:}}
//         )
    
//     console.log(student);

// })




// app.post('/index',async(req,res)=>{
//     const inputName = req.body.txtName;
//     const inputAge = req.body.txtAge;
   
//     const newValue =  {name:inputName,age:inputAge};
//     const client = await MongoClient.connect(url);
//     const dbo = client.db("TrainerManagement");
//     await dbo.collection("students").insertOne(newValue)
    
//     res.redirect('/view')
// })


// app.get('/view',async(req,res)=>{
//     const id = req.query.id;
    
//     const client = await MongoClient.connect(url);
//     const dbo = client.db("TrainerManagement");
//     const students = await dbo.collection("courses").findOne({_id:ObjectId(id)});
//     console.log(students);
//     res.render('viewStudent',{data: students});
// })


// app.get('/view',(req,res)=>{
//     res.render('viewStudent')
// })

// app.post('/index',async(req,res)=>{
//     const inputName = req.body.txtName;
//     const inputAge = req.body.txtAge;
    
//     const all = {name:inputName, age:inputAge}

//     const client = await MongoClient.connect(url);
//     const dbo = client.db("TrainerManagement");
//     const into = await dbo.collection("students").updateOne(all);
//     res.render('viewStudent',{produc:into})
// })


const PORT= process.env.PORT || 5000;
app.listen(PORT)
console.log("app is running",PORT)