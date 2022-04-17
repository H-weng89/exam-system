
import axios  from "axios";
axios.defaults.baseURL = 'https://www.jessieback.top/oes'

// �ӿڷ���

let login = (data)=>{
    return  axios.post('/user/login',data)

}

let setToken = ()=>{
    axios.defaults.headers[sessionStorage.getItem('tokenName')] = sessionStorage.getItem('token')
}

//�������
 let createStore = (data)=>{
     setToken()
     return axios.post('/teacher/createStore',data)
 }

//����ѡ����
let createProblem = (data)=>{
    setToken()

    return axios.post('/question/newSelections',data)
}
//���������
let createProblem2 = data=>{
    setToken()
    return axios.post('/question/newBlanks',data)
}
//��������
 let createProblem3 = (data)=>{
     setToken()
     return axios.post('/question/newAnswerQuestions',data)
 }
//��������
let searchProblem = (data)=>{
    setToken()
    return axios.post('/question/search',data)
}

//��ȡ���
let getStore = ()=>{
    setToken()
    return axios.post('/teacher/getStores')
}


//��ȡȫ������
let getAllProblem = ()=>{
    setToken()
    return axios.post('/question/getByTeacher')
}

//��ȡ����µ���Ŀ
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


//��ȡ�Ծ� ѧ��
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


//��ȡ�Ծ�
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

//�����Ծ�
let createPaper = (data)=>{
    setToken()
    return axios.post('/examPaper/newExamPaper',data)
}

//�޸��Ծ�
 let editPaper = (data)=>{
     setToken()
     return axios.post('/examPaper/editExamPaper',data)
 }

 //��ȡ����ѧ��

 let getAllStudent = ()=>{
     setToken()
     return axios.post('/exam/getAllStudent')
 }

 //���ѧ������ʦ

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


//��ȡ����
let getExam = ()=>{
    setToken()
    return axios.post('/exam/getExam')
}



 //��ȡ��ʦ��ѧ��

 let getStudent1 = ()=>{
     setToken()
     return axios.post('/teacher/getStudents')
 }

 //����ѧ��
 let searchStudent = (data)=>{
     setToken()
     return axios.post('/exam/searchStudent',data)
 }
 
 //��������
 let createExam = (data)=>{
     setToken()
     return axios.post('/exam/newExam',data)
 }

 //��ȡ���뿼�Ե�ѧ��
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

// ���ѧ��������
 let addStudent1 = (data)=>{
     setToken()
     return axios.post('/exam/addStudent',data)

 }

 //ѧ����ȡ����

 let getExamS = ()=>{
     setToken()
     return axios.post('/student/getExamByStuID')
 }

 //��ȡѧ���ύ���Ծ�
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

    //ע��
     //�����ʼ�
    let getCode= (data)=>{
        return axios.post('/user/RealRegister1',data)
    }
     // ע��
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