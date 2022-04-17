
import axios  from "axios";
axios.defaults.baseURL = 'https://www.jessieback.top/oes'

// 接口方法

let login = (data)=>{
    return  axios.post('/user/login',data)

}

let setToken = ()=>{
    axios.defaults.headers[sessionStorage.getItem('tokenName')] = sessionStorage.getItem('token')
}

//创建题库
 let createStore = (data)=>{
     setToken()
     return axios.post('/teacher/createStore',data)
 }

//创建选择题
let createProblem = (data)=>{
    setToken()

    return axios.post('/question/newSelections',data)
}
//创建填空题
let createProblem2 = data=>{
    setToken()
    return axios.post('/question/newBlanks',data)
}
//创建大题
 let createProblem3 = (data)=>{
     setToken()
     return axios.post('/question/newAnswerQuestions',data)
 }
//搜索试题
let searchProblem = (data)=>{
    setToken()
    return axios.post('/question/search',data)
}

//获取题库
let getStore = ()=>{
    setToken()
    return axios.post('/teacher/getStores')
}


//获取全部试题
let getAllProblem = ()=>{
    setToken()
    return axios.post('/question/getByTeacher')
}

//获取题库下的题目
let getProblem = id=>{
    setToken()
    return axios({
        method: 'POST',
        url: '/teacher/getStoreQuestions',
        data: id,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
}


//获取试卷 学生
let getPaperS = (id)=>{
    setToken()
    return axios({
        method: 'POST',
        url: '/student/getExamPaper',
        data: id,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })

}

let submit = (data)=>{
    setToken()
    return axios.post('/student/commitExamPaper',data)
}


//获取试卷
let getPaper = id=>{
    setToken()
    return axios({
        method: 'POST',
        url: '/examPaper/getExamPaperByTeacher',
        data: id,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
}

//创建试卷
let createPaper = (data)=>{
    setToken()
    return axios.post('/examPaper/newExamPaper',data)
}

//修改试卷
 let editPaper = (data)=>{
     setToken()
     return axios.post('/examPaper/editExamPaper',data)
 }

 //获取所有学生

 let getAllStudent = ()=>{
     setToken()
     return axios.post('/exam/getAllStudent')
 }

 //添加学生到老师

 let addStudent = (data)=>{
     setToken()
      return axios({
        method: 'POST',
        url: '/teacher/addStudents',
        data: data,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
 }

 let removeStudent = (data)=>{
    setToken()
     return axios({
       method: 'POST',
       url: '/teacher/removeStudents',
       data: data,
       headers: {
           'Content-Type': 'application/json; charset=utf-8'
       }
   })
}


//获取考试
let getExam = ()=>{
    setToken()
    return axios.post('/exam/getExam')
}



 //获取老师的学生

 let getStudent1 = ()=>{
     setToken()
     return axios.post('/teacher/getStudents')
 }

 //搜索学生
 let searchStudent = (data)=>{
     setToken()
     return axios.post('/exam/searchStudent',data)
 }
 
 //创建考试
 let createExam = (data)=>{
     setToken()
     return axios.post('/exam/newExam',data)
 }

 //获取参与考试的学生
 let getStudent = (data)=>{
    setToken()
     return axios({
       method: 'POST',
       url: '/exam/getExamStudents',
       data: data,
       headers: {
           'Content-Type': 'application/json; charset=utf-8'
       }
   })
}

// 添加学生到考试
 let addStudent1 = (data)=>{
     setToken()
     return axios.post('/exam/addStudent',data)

 }

 //学生获取考试

 let getExamS = ()=>{
     setToken()
     return axios.post('/student/getExamByStuID')
 }

 //获取学生提交的试卷
 let getExamFstudent = (data)=>{
    setToken()
    return axios({
      method: 'POST',
      url: '/examPaper/getStuExamPaper',
      data: data,
      headers: {
          'Content-Type': 'application/json; charset=utf-8'
      }
  })

  
 }

 let check = (data)=>{
    setToken()
    return axios.post('/exam/setScore',data)
    }

    //注册
     //发送邮件
    let getCode= (data)=>{
        return axios.post('/user/RealRegister1',data)
    }
     // 注册
    let register= (data)=>{
        return axios.post('/user/RealRegister2',data)
    }
 
 
export default{
  login,
  setToken,
  axios,
  createStore,
  createProblem,
  searchProblem,
  getStore,
  createProblem2,
  createProblem3,
  getProblem,
  getAllProblem,
  createPaper,
  getPaper,
  editPaper,
  getAllStudent,
  addStudent,
  getStudent1,
  removeStudent,
  searchStudent,
  createExam,
  getExam,
  getStudent,
  addStudent1,
  getExamS,
  getPaperS,
  submit,
  getExamFstudent,
  check,
getCode,
register
}