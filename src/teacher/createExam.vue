<template>
 
          <div class="wra">
        <div class="header">
            <div class="myExam">创建考试</div>
            <div class="btn"> <a-button type="primary" ghost @click="back">返回</a-button></div>
           
            <!-- <div :class="{'ing':1,'chosen':1}">�������</div>
            <div :class="{'end':1,}">������</div> -->
        </div>
        <div class="main">
                   <div class="form">
                           <div class="item">
                      <div class="name">*考试名称</div>
                     
                      <a-input v-model:value="form.name" placeholder="Basic usage" style="
width: 270px;
	height: 35px;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #3a4167;" />
                    </div>
                      <div class="item">
                      <div class="name">*考试发布时间</div>
                      <a-space direction="vertical">
    <a-date-picker show-time  :locale="locale"  v-model="form.time"/>
   
  </a-space>
                     
                   
                    </div>
                     <div class="item">
                      <div class="name">及格分数线</div>
                     
                      <a-input v-model:value="form.pass" placeholder="Basic usage" style="
 width: 270px;
	height: 35px;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #3a4167 !important;" />
                    </div>
                       <div class="item">
                      <div class="name">考试通知时间</div>
                      <a-space direction="vertical">
    <a-date-picker show-time  :locale="locale" v-model="form.messageTime" />
   
  </a-space>
                     
                   
                    </div>
                     <div class="item">
                     <div class="name">考试开始时间</div>
                      <a-space direction="vertical">
    <a-date-picker show-time  :locale="locale" v-model="form.startTime" />
   
  </a-space>
                     
                   
                    </div>
                      <div class="item">
                     <div class="name">成绩公布时间</div>
                      <a-space direction="vertical">
    <a-date-picker show-time  :locale="locale" v-model="form.publicTime" />
   
  </a-space>
                     
                   
                    </div>
                      <div class="item">
                      <div class="name">最多考试次数</div>
                     
                      <a-input v-model:value="form.num" placeholder="Basic usage" style="
 width: 270px;
	height: 35px;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #3a4167;" />
                    </div>
                     <div class="item">
                      <div class="name">添加试卷</div>
                      <a-input-search
      v-model:value="form.exam"
      placeholder="input search text"
      style="width:270px;
      
      "
      
      
    
      @search="add(1)"
    >
      <template #enterButton>
      <a-button>
        +
      </a-button>

       
      
      
      </template>
    </a-input-search>

                     
                     
                    </div>
                     <div class="item">
                     <div class="name">考试结束时间</div>
                      <a-space direction="vertical">
    <a-date-picker show-time  :locale="locale" v-model="form.endTime" />
   
  </a-space>
                     
                   
                    </div>
                      <div class="item">
                     <div class="name">答案公布时间</div>
                      <a-space direction="vertical">
    <a-date-picker show-time  :locale="locale" v-model="form.answerTime" />
   
  </a-space>
                     
                   
                    </div>
                     <div class="item">
                     <div class="name">考试最晚进入时间</div>
                      <a-space direction="vertical">
    <a-date-picker show-time  :locale="locale" v-model="form.latestTime" />
   
  </a-space>
                     
                   
                    </div>
                    <div class="item">
                      <div class="name">考试对象</div>
                      <a-input-search
      v-model:value="form.group"
      placeholder="input search text"
      style="width:270px;
      
      "
      
      
    
      @search="add(2)"
    >
      <template #enterButton>
        <a-button>
          +
        </a-button>
      
          
       
      
      
      </template>
    </a-input-search>

                     
                     
                    </div>
                   </div>
                   <div class="other">
                    <div class="item">
                      <div class="name">其他备注</div>
                         <a-input v-model:value="form.name" placeholder="Basic usage" style="
 width: 270px;
	height: 35px;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #3a4167;" />
                    </div>
                   </div>
                   <div class="btn2"> <a-button type="primary" ghost>确定</a-button></div>
        </div>
        
          <a-modal v-model:visible="visible"  @ok="handleOk" cancelText="取消" okText="确定"   width="56%" height="40%" className = "model" >
          
           <div class="add" v-if="flag">
              <div class="title">
                添加试卷
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
                  试卷名称: <a-input-search
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
                <div class="btn" >全部添加</div>
              </div>
              <div class="main">
                <a-table :columns="columns" :data-source="data" :pagination="{pageSize:5}"  rowKey="account">
    <template #action="{record}">
      <div class="operate">
 <a @click="start(1,record)" style="color:#45d793" v-if="1">添加 </a>
      <!-- <a @click="start(1,record)" style="color:#ffbb65">查看 </a> -->
      <a style="color:#dc5716" v-else>移除</a>
      </div>
    </template>
  </a-table>

              </div>
           </div>
           
           <div class="add" v-if="!flag">
              <div class="title">
                添加考试对象
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
                  对象相关信息: <a-input-search
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
                <div class="btn" >全部添加</div>
              </div>
              <div class="main">
                <a-table :columns="columns2" :data-source="data" :pagination="{pageSize:5}"  rowKey="account">
    <template #action="{record}">
      <div class="operate">
 <a @click="start(1,record)" style="color:#45d793" v-if="1">添加 </a>
      <!-- <a @click="start(1,record)" style="color:#ffbb65">查看 </a> -->
      <a style="color:#dc5716" v-else>移除</a>
      </div>
    </template>
  </a-table>

              </div>
           </div>
    
              
    </a-modal>
       
          </div>
</template>
<script>
import { defineComponent, reactive,ref } from 'vue';
import {useRouter} from 'vue-router'
 import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
 import moment from 'moment';
  import 'moment/dist/locale/zh-cn';
export default defineComponent({
  setup() {
    //试卷数据
       const columns = ref([{
      title: '试卷名称',
      width: 100,
      dataIndex: 'name',
      ellipsis: true,
      key: 'name',
      fixed: 'left',
     
    }, {
      title: '试卷总分',
      width: 100,
      dataIndex: 'age',
      key: 'age',
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
     const columns2 = ref([{
      title: '姓名',
      width: 100,
      dataIndex: 'name',
      ellipsis: true,
      key: 'name',
      fixed: 'left',
     
    }, {
      title: '学校',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
     
    },
    {
      title: '专业班级',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
     
    },{
      title: '学号',
      width: 100,
      dataIndex: 'age',
      key: 'age',
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
    const data = [
     

    ];

    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
        // operation:'进入考试'
        
      });
    }
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
    //   let route = useRoute()
moment.locale('zh-cn')
    let form = reactive({
        name:'',
        time:moment('2015-01-01', 'YYYY-MM-DD'),
        pass:'',
        messageTime:'',
        startTime:'',
        publicTime:'',
        num:'',
        exam:'',
        endTime:'',
        answerTime:'',
        latestTime:'',
        group:'',
        other:'',
        examList:[ {
        value: 'jack',
        label: 'Jack (100)',
      },],
       groupList:[ {
        value: 'jack',
        label: 'Jack (100)',
      },]
    })

    return {
        form,
        locale,
        back,
        add,
        flag,
        visible,
        columns,
        data,
        columns2
     
    };
  },
});
</script>
<style lang="less" scoped>
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
.add{
  :global(.ant-input-affix-wrapper .ant-input-suffix :not(.anticon)){
    color: #5783ff;;
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
    margin-top: 30px;
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
   
    width: 97%;
	height: 68vh;
	background-color: #ffffff;
	border-radius: 1vh;
    margin: auto;
    display: flex;
    align-items: flex-start;
    padding-left: 20px;
    padding-top: 20px;
    flex-direction: column;
    .form{
        width: 100%;
        height: 70%;
        display: flex;
    align-items: flex-start;
     flex-direction: column;

     flex-wrap: wrap;
    }

    .item{ 
      /deep/ .ant-btn-primary{
        background-color: #ffffff !important;
      }
        margin-bottom: 20px;
        /deep/.ant-calendar-picker-input.ant-input{
          width: 270px;
	height: 35px;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #3a4167;
        }

        /deep/.ant-select:not(.ant-select-customize-input) .ant-select-selector{
       width: 270px;
	height: 35px;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 2px #3a4167;
        }
   
    
        .name{
      width: 12vh;
	height: 3vh;
	font-family: Microsoft YaHei;
	font-size: 2vh;
	font-weight: normal;
	font-stretch: normal;
	line-height: 3vh;
	letter-spacing: 0vh;
	
     }}
      .btn2{
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
    
}
 
 
   
 
}


</style>