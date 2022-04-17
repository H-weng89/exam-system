<template>
 
          <div class="wra">
        <div class="header">
            <div class="myExam">创建试卷</div>
            <div class="btn"> <a-button type="primary" ghost @click="back">返回</a-button></div>
           
            <!-- <div :class="{'ing':1,'chosen':1}">�������</div>
            <div :class="{'end':1,}">������</div> -->
        </div>
          <div class="main">
            <div class="form">
                <div class="item">
                      <div class="name">*试卷名称</div>
                     
                      <a-input v-model:value="form.name" placeholder="Basic usage" style="
width: 270px;
	height: 35px;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #3a4167;" />
                    </div>
                      <div class="item">
                      <div class="name">*试卷总分</div>
                     
                      <a-input v-model:value="form.scores" placeholder="Basic usage" style="
width: 270px;
	height: 35px;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #3a4167;" />
                    </div>
                      <div class="item"  style="margin-right:20px">
                      <div class="name">*试卷权限</div>
                     
                      <a-select
    v-model:value="form.role"
    label-in-value
    style="width: 270px"
    :options="form.roleList"
    @change="handleChange"
  >
  </a-select>
                    </div>
            </div>
            <div class="add1">
              <div class="title">*添加大题</div>
              <div class="btn"> <a-button type="primary" ghost @click="addB">+添加大题</a-button></div>
              <div class="list">
                 <a-list item-layout="vertical" size="large" :pagination="{pageSize: 2,}" :data-source="bigProblem">
                    <template #renderItem="{item,index}">
      <a-list-item :key="index">
                <div class="big">       
                  <div class="header">
                    <div class="name"> <a-input v-model:value="item.name" placeholder="Basic usage" style="
	width: 105vh;
	height: 37px;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #3a4167;" /></div>
                    <div class="addP"> <a-button type="primary" ghost @click="addP(item)">+添加试题</a-button></div>
                   
                  </div>
                   <div class="problem" v-for="(pro,key) in item.children"  :key="key">
                           <div class="problemName">
                                     {{pro.body}}
                           </div>
                           <div class="answer" v-if="pro.type=='选择题'">
                             <div> A.{{pro.a}}

                             </div>
                             <div>B.{{pro.b}}</div>
                             <div>C.{{pro.c}}</div>
                             <div>D.{{pro.d}}</div>
                           </div>
                   </div>
                </div>
      </a-list-item>
                    </template>
                 </a-list>
              </div>

            </div>
               <div class="btn2"> <a-button type="primary" ghost @click="create">确定</a-button></div>
          </div>
            <a-modal v-model:visible="visible1"  @ok="handleOk" cancelText="取消" okText="确定"   width="55%" height = "40%"  className = "model" style="	border-radius: 9px;">
           
           <div class="add">
              <div class="title">
                添加试题
              </div>
              <div class="header">
                <div class="search" style="font-family: Microsoft YaHei;
font-family: Microsoft YaHei;
	font-size: 1vw;
	font-weight: normal;
	font-stretch: normal;
	line-height: 2vw;
	letter-spacing: 0vw;
	color: #5783ff;
  display:flex;
   justify-content: center;
   align-items:center;">
                  试题相关信息: <a-input-search
      v-model:value="value"
      placeholder="input search text"
      style="
width: 11vw;
	height: 2vw;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #5783ff;
  margin-left:10px;
  
  "

      @search="onSearch"
    />
                </div>
              
              </div>
                <a-tabs v-model:activeKey="activeKey" @change ="tabChange">
    <a-tab-pane key="1" tab="选择题"> 
      <div class="main">
                <a-table :columns="columns" :data-source="choose" :pagination="{pageSize:4}"  rowKey="account">
    <template #action="{record}">
      <div class="operate">
 <a @click="addD(record)" v-if="!record.isC" style="color:#45d793">添加 </a>
      <!-- <a @click="start(1,record)" style="color:#ffbb65">查看 </a> -->
        <a style="color:#dc5716" @click.prevent="addD(record)" v-if="record.isC" >移除</a>
      </div>
    </template>
  </a-table>

              </div>
              </a-tab-pane>
    <a-tab-pane key="2" tab="填空题" force-render><div class="main">
                <a-table :columns="columns" :data-source="blanks" :pagination="{pageSize:4}"  rowKey="account">
    <template #action="{record}">
      <div class="operate">
 <a @click="addD(record)" v-if="!record.isC" style="color:#45d793">添加 </a>
      <!-- <a @click="start(1,record)" style="color:#ffbb65">查看 </a> -->
        <a style="color:#dc5716" @click.prevent="addD(record)" v-if="record.isC" >移除</a>
      </div>
    </template>
  </a-table>

              </div></a-tab-pane>
    <a-tab-pane key="3" tab="大题"><div class="main">
                <a-table :columns="columns" :data-source="answerQ" :pagination="{pageSize:4}"  rowKey="account">
    <template #action="{record}">
      <div class="operate">
 <a @click="addD(record)" v-if="!record.isC" style="color:#45d793">添加 </a>
      <!-- <a @click="start(1,record)" style="color:#ffbb65">查看 </a> -->
      <a style="color:#dc5716" @click.prevent="addD(record)" v-if="record.isC" >移除</a>
      </div>
    </template>
  </a-table>

              </div></a-tab-pane>
  </a-tabs>
             
           </div>
    
              
    </a-modal>
        
      
       
          </div>
</template>
<script>
import { message } from 'ant-design-vue';
import { defineComponent, reactive,ref,onMounted } from 'vue';
import {useRouter,useRoute} from 'vue-router'
import api from '../api/axios'

export default defineComponent({
  setup() {
    let route = useRoute()

    //是否查看跳转而来
    let isDetail = ref(false)
     //大题
    let  visible1 = ref(false)
    let bigNum = ref(0)
     let bigProblem = ref([{name:'',children:[],num:bigNum.value}])
     let addB = ()=>{
       bigNum.value++
       if(bigNum.value>2){
         message.warn('目前只支持三道大题')
         return
       }
       let item = {name:'',children:[],num:bigNum.value}
       bigProblem.value.push(item)
     }


//提交试卷

let create = async ()=>{
  if(!isDetail.value){
bigProblem.value.push({name:form.name})  //试卷名称
  bigProblem.value.push({role:form.role}) //试卷权限
  let data = {scores:form.scores,body:JSON.stringify(bigProblem.value)}
  let result = await api.createPaper(data)
  if(result.data.code==200){
    message.info(result.data.msg)
    back()
  }
  }
  else{
    bigProblem.value.push({name:form.name})  //试卷名称
  bigProblem.value.push({role:form.role}) //试卷权限
  let data = {scores:form.scores,body:JSON.stringify(bigProblem.value),id:JSON.parse(route.query.main).id}
  let result = await api.editPaper(data)
  if(result.data.code==200){
    message.info(result.data.msg)
    back()
  }
     
  }
  


}
    
  
    let addP = (i)=>{
      console.log(i)
      sessionStorage.setItem('bigNum',i.num)
      visible1.value = true
  //  bigProblem.value[i].children.push({name:''})
  //     console.log(bigProblem.value)

    }
    let addD = (item)=>{
      console.log(item.isC)
      item.isC = !item.isC
       if(item.isC){
         bigProblem.value[sessionStorage.getItem('bigNum')].children.push(item)
       }
       else{
         bigProblem.value[sessionStorage.getItem('bigNum')].children.forEach((e,index)=>{
           if(e.body==item.body){
             bigProblem.value[sessionStorage.getItem('bigNum')].children.splice(index,1)

           }
         })
       }
      
      console.log(bigProblem.value[sessionStorage.getItem('bigNum')].children)

    }

    
    //选项卡
    let activeKey = ref(1)

    let tabChange = (key)=>{
      console.log(key)
    }

    let answerQ =ref([])
    let blanks = ref([])
    let choose = ref([])
      
      //获取试题/
      onMounted(async()=>{

        message.info('目前暂时规定 选择题每题2分 填空题每题2分 大题每题20分')
        let result = await api.getAllProblem()
        console.log(result)
           answerQ.value = result.data.data.answerQuestions
      answerQ.value.forEach(item=>{
        item.type = '大题'
        item.isC = false
        if(item.public){
          item.role = '公开'
        }
        else{
          item.role = '私有'
        }
      })
       blanks.value = result.data.data.blanks
      blanks.value.forEach(item=>{
        item.type = '填空题'
          item.isC = false
          if(item.public){
          item.role = '公开'
        }
        else{
          item.role = '私有'
        }
      })
       choose.value = result.data.data.selections
      choose.value.forEach(item=>{
        item.type = '选择题'
          item.isC = false
          if(item.public){
          item.role = '公开'
        }
        else{
          item.role = '私有'
        }
      })


      //若是由查看跳转而来
      
       let main = JSON.parse(route.query.main)

       if(main){
         isDetail.value = true
                let big = JSON.parse(main.main)
            big.splice(big.length-2,2)
  bigProblem.value = big
  console.log(big)
  form.name = main.name
  form.scores = main.scores
  form.role = {laben:main.role,value:main.role}
       }
      
       
    
      })
 
    //添加试卷和添加对象
    let  flag = ref(false)  //1添加试卷 2添加对象
    let visible = ref(false)
    let add = (i)=>{
      visible.value = true
      if(i==1){
        
        flag.value = true

      }
      else{
        flag.value = false
      }


    }
      let router = useRouter() 
      let back = ()=>{
       router.go(-1)
      }
     
 const columns = ref([{
      title: '题目类型',
      width: 100,
      dataIndex: 'type',
      ellipsis: true,
      key: 'type',
      fixed: 'left',
     
    }, 
    {
      title: '题干',
      width: 100,
      dataIndex: 'body',
      key: 'body',
      fixed: 'left',
     
    },
     
     {
     title:'操作',
      key: 'operation',
      dataIndex:'operation',
      align: 'center',
       slots: {
      customRender: 'action',
    },

      
    
      width: 50,
    },]);
    let form = reactive({
        name:'',
     
        pass:'',
        messageTime:'',
        startTime:'',
        publicTime:'',
        scores:'',
        num:'',
        exam:'',
        endTime:'',
        answerTime:'',
        latestTime:'',
        group:'',
        other:'',
        role:'',
        examList:[ {
        value: 'jack',
        label: 'Jack (100)',
      },],
       groupList:[ {
        value: 'jack',
        label: 'Jack (100)',
      },],
       roleList:[ {
        value: '私有',
        label: '私有',
      },
      {value:'公有',
      label:'公有'}]
    })

    let handleOk = ()=>{
      visible1.value = false
    }

    return {
        form,
     handleOk,
        back,
        add,
        flag,
        visible,
        bigProblem,
        addB,
        addP,
        visible1,
        columns,
        addD,
        activeKey,
        tabChange,
        answerQ,
        blanks,
        choose,
        create,
       
       
    
     
     
     
    };
  },
});
</script>
<style lang="less" scoped>
  //对话框
  .add{
  :global(.ant-input-affix-wrapper .ant-input-suffix :not(.anticon)){
    color: #5783ff;;
  }
      /deep/.ant-tabs-bar{
      display: flex;
      justify-content: center;
    }
   .title{

    width: 180px;
	height: 40px;
	font-family: Microsoft YaHei;
	font-size: 30px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40px;
	letter-spacing: 0px;
	color: #5783ff;
  margin: auto;
  }
  .header{
    width: 96%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 20px;
    .btn:hover{
      cursor: pointer;
    }
    .btn{
      width: 7vw;
	height: 2vw;
	border-radius: 5px;
	border: solid 2px #51cc71;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-family: Microsoft YaHei;
	font-size: 1vw;
	font-weight: normal;
	font-stretch: normal;
	line-height: 2vw;
	letter-spacing: 0vw;
	color: #2ec255;
    }
  }
  .main{
        /deep/.ant-table-thead > tr:first-child > th{
          background-color:#f6f7fc ;
        }
     
  }

}
 :global(.ant-modal-footer  button:nth-child(1)){
       display: none;
      }
      
    :global(.ant-modal-footer){
      display: flex;
      justify-content: center;
      button:nth-child(1){
       
      }
   
      
    }
     :global(  .ant-modal-footer  button:nth-child(2)){
          
width: 188px;
	height: 41px;
	background-color: #5783ff;
	border-radius: 8px;


      width: 100px;
     
      border-radius: 5px;
      }

.wra{

    width: 98% !important;
    height: 95% !important;
  
    background-color: #eceff8;
    margin: auto;
    margin-top: 20px;
    .header{
        width: 95%;

        height: 7%;
        display: flex;
       font-family: Microsoft YaHei;
        justify-content: space-between;
        margin-left: 20px;
        align-items: center;
        font-size: 20px;
        margin-bottom: 10px;
        /deep/.ant-btn-background-ghost.ant-btn-primary{
        display: flex;
        justify-content: center;
        align-items: center;
	width: 17vh;
	// height: 4vh;
	background-color: #5783ff !important;
	border-radius: 9px;
    font-family: Microsoft YaHei;
	font-size: 2vh;
	font-weight: normal;
	font-stretch: normal;
	line-height: 3vh;
	letter-spacing: 0vh;
	color: #ffffff;
        }
        .btn{
           
        }
        .chosen{
          color: #3a4167;
          font-weight: 500;
        }
        .myExam{
            font-family: Microsoft YaHei;
            font-size: 20px;
            color: black;
        }
    }

.main{
   
  width: 98%;
	height: 79vh;
	background-color: #ffffff;
	border-radius: 1vh;
    margin: auto;
    display: flex;
    align-items: flex-start;
    padding-left: 20px;
    padding-top: 20px;
    flex-direction: column;
 .form{
   display: flex;
    width: 100%;
    justify-content: space-between;
   .item{
      .name{
        display: flex;
        justify-content: flex-start;
        font-family: Microsoft YaHei;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 33px;
	letter-spacing: 1px;
	
      }
      /deep/.ant-select:not(.ant-select-customize-input) .ant-select-selector{
        width: 270px;
	height: 35px;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #3a4167;

      }
   }
 }

 .add1{
    width: 98%;
    margin: auto;
   margin-top: 20px;
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: flex-start;
.title{
  font-family: Microsoft YaHei;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 33px;
	letter-spacing: 1px;
  margin-bottom: 20px;

}
.btn{
   /deep/.ant-btn-background-ghost.ant-btn-primary{
        display: flex;
        justify-content: center;
        align-items: center;

	background-color: #5783ff !important;
	border-radius: 9px;
    font-family: Microsoft YaHei;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	// line-height: 3vh;
	letter-spacing: 0vh;
	color: #ffffff;
        }
}

.list{
   
  width: 100%;
  .big{
    width: 100%;
    max-height: 150px;
    overflow: auto;
    // margin-bottom: 20px;

	background-color: #ffffff;
	border-radius: 10px;
	border: solid 1px #3a4167;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .header{
    width: 96%;
    margin-top: 5px;
    height: 50px;
    display: flex;
    justify-content: center;
     
    .name{
    margin-right: 20px;
    }
     /deep/.ant-btn-background-ghost.ant-btn-primary{

        display: flex;
        justify-content: center;
        align-items: center;
     height: 37px;
      
	background-color: #5783ff !important;
	border-radius: px;
    font-family: Microsoft YaHei;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	// line-height: 3vh;
	letter-spacing: 0vh;
	color: #ffffff;
        }

  }
  }
  .problem{
    width: 96%;
    margin: auto;
    margin-bottom: 10px;
  
	
	background-color: #ffffff;
	box-shadow: 2px 2px 10px 0px 
		rgba(0, 0, 0, 0.16);
	border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

    padding-left: 20px;

    .problemName{
      font-family: Microsoft YaHei;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 26px;
	letter-spacing: 1px;
    }
    .answer{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin-left: 10px;
    }
  
  }}}
  

 
}
 
   
 
}

.btn2{
  position: absolute;
  bottom: 5%;
  left: 55%;
  transform: translate(-50%,0);
   margin: auto;
    /deep/.ant-btn-background-ghost.ant-btn-primary{
        display: flex;
        justify-content: center;
        align-items: center;
	width: 17vh;
	height: 4vh;
	background-color: #5783ff !important;
	border-radius: 9px;
    font-family: Microsoft YaHei;
	font-size: 2vh;
	font-weight: normal;
	font-stretch: normal;
	line-height: 3vh;
	letter-spacing: 0vh;
	color: #ffffff;
        }

}


</style>