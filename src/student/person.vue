<template>
    <div class="wra">
        <div class="header">
            <div class="myExam">个人信息</div>
           
            <!-- <div :class="{'ing':1,'chosen':1}">试题管理</div>
            <div :class="{'end':1,}">题库管理</div> -->
        </div>
        <div class="second">
          
            <div class="search">
                 修改个人信息
            </div>
            <!-- <div class="bt"><a-button type="primary" style="
    border-radius: 4px;
    width: 100px;
    background-color:#5784ff;
" @click="toDetail(1)">添加试卷</a-button></div> -->
        </div>

        <div class="main">
             <div class="form">
                           <div class="item">
                      <span class="name">*邮箱</span>
                     
                             <div class="mail">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                            <a  style="margin-left:20px" @click="change"> 修改邮箱</a>
      

        </div>
                      <div class="item">
                      <span class="name">学号</span>
                     
                      <a-input v-model:value="person.num" placeholder="Basic usage" style="
width: 400px;
	height: 4vh;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #5783ff;
}" />
                    </div>
                       <div class="item">

                      <span class="name">*姓名</span>
                     
                      <a-input v-model:value="person.name" placeholder="Basic usage" style="
width: 400px;
	height: 4vh;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #5783ff;
}" />
                    </div>
                       <div class="item">
                      <span class="name">专业班级</span>
                     
                      <a-input v-model:value="person.class" placeholder="Basic usage" style="
width: 400px;
	height: 4vh;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #5783ff;
}" />
                    </div>
                       <div class="item">
                      <span class="name">*身份</span>
                     
                      <a-input v-model:value="person.role" placeholder="Basic usage" style="
width: 400px;
	height: 4vh;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #5783ff;
}" />
                    </div>
                     <div class="item">
                      <span class="name">备注信息</span>
                     
                      <a-textarea :rows = "3" v-model:value="person.description" placeholder="Basic usage" style="
width: 400px;
	<!-- height: 4vh; -->
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #5783ff;
}" />
                    </div> <div class="item">
                      <span class="name">*学校</span>
                     
                   <a-input :rows="4" placeholder="maxLength is 6" :maxlength="6" style="
                   width: 400px;
	height: 4vh;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #5783ff;"
                   />
                    </div>

                
            
                   </div>
                   
    <div class="btn2"> <a-button type="primary" ghost>确定</a-button></div>
        </div>
       
         <a-modal v-model:visible="visible"  @ok="handleOk" cancelText="取消" okText="确定" >
       <div class="create">
            
             <div class="title">修改邮箱</div>
             <div class="main">
               <a-input v-model:value="person.mail" placeholder="新邮箱" style="border-radius: 5px;background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #5783ff;" />

  <div class="code">
     <a-input v-model:value="person.mail" placeholder="验证码" style="border-radius: 5px;background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #5783ff;
  width:200px" />
  <a v-if="!isGet" @click="getCode">获取验证码</a>
  <a-spin  v-else/>
    </div>              
  
  
             </div>
           </div>
    </a-modal>
    </div>
</template>

<script>
//假数据




import {useRoute,onBeforeRouteUpdate,useRouter} from 'vue-router'
import { defineComponent, ref,onMounted, reactive} from 'vue';
export default defineComponent({
 
  
  setup() {
    //修改邮箱
    let change = ()=>{
      visible.value = true
    }

    let getCode = ()=>{
      isGet.value = true
    }

    let isGet = ref(false)
    //个人信息
    let person = reactive({
      mail:'',
      name:'',
      role:'',
      scholl:'',
      num:'',
      class:'',
      description:''
    })
    //查看题库
    function toDetail(i,record){
      console.log(record)
        if(i==1){
          router.push('/checkPaper')
        }
      
    }
    //对话框
     const visible = ref(false);
    function start(i){
      i
      
      visible.value = true
    }
    const handleOk = e => {
      console.log(e);
      visible.value = false;
    };
    //判断
    let route = useRoute()
    let router = useRouter()
    let key = ref(route.query.key)
onBeforeRouteUpdate(to => {
     key.value = to.query.key
});
    onMounted(()=>{
      //根据key获取数据
      key.value = route.query.key
    })
   

  
    
  //学科选择和搜索
const value = ref('');

    const onSearch = searchValue => {
      console.log('use value', searchValue);
      console.log('or use this.value', value.value);
    };

    const focus = () => {
      console.log('focus');
    };

    const handleChange = value => {
      console.log(`selected ${value}`);
    };
    //表格

    return {
      focus,
      handleChange,
      value,
      onSearch,

 key,
 start,
 handleOk,
 visible,
 toDetail,
 person,
 change,
 isGet,
 getCode
    
 
 
    
    };
  },

});


</script>

<style lang="less" scoped>
.create{
  width: 100%;
  height: 100%;

  .code{

    width: 400px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    position: relative;
    a{
      position: absolute;
      right: 52%;
    }
  }
  
  .title{
  margin: auto;
    font-size: 20px;
    width: 120px;
	height: 40px;
	font-family: Microsoft YaHei;
	font-size: 30px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40px;
	letter-spacing: 0px;
	color: #5783ff;
   
  }
  .main{
    width: 90%;
    margin: auto;
    margin-top: 20px;
    /deep/.ant-select:not(.ant-select-customize-input) .ant-select-selector{
      border-radius: 5px;
      background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #5783ff;
    }

  
   :global(.ant-modal-footer  button:nth-child(1)){
       display: none;
      }
        :global(.ant-modal-footer  button:nth-child(2)){
width: 188px;
	height: 41px;
	background-color: #5783ff;
	border-radius: 8px;

      width: 100px;
     
      border-radius: 5px;
      }
    :global(.ant-modal-footer){
      display: flex;
      justify-content: center;
      button:nth-child(1){
       
      }
   
      
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
        width: 40%;
        height: 7%;
        display: flex;
       
        justify-content: flex-start;
        margin-left: 20px;
        align-items: center;
        font-size: 20px;
        margin-bottom: 10px;
        
        .chosen{
          color: #3a4167;
          font-weight: 500;
        }
        .myExam{
            font-size: 20px;
            color: black;
        }
    }

    .second{
        align-items: center;
        margin-top: 10px;
        width: 98%;
        height: 65px;
        display: flex;
        justify-content: space-between;
        margin: auto;
        border-radius: 5px;
        background-color: white;
        margin-bottom: 10px;
        .bt{
          border-radius: 10px;
          margin-right: 20px;
        }

        .search{
     width: 9vw;
	height: 2vw;
	font-family: Microsoft YaHei;
	font-size: 17px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 2vw;
	letter-spacing: 0vw;
	color: #3a4167;
         
          margin-left: 20px;
        }
    }

    .main{
width: 98%;
margin: auto;
	height: 35vw;
	background-color: #ffffff;
	border-radius: 1vw;
  padding-top: 20px;
     .form{
        width: 90%;
        margin: auto;
        height: 70%;
        
        display: flex;
             align-items: flex-start;
    justify-content: space-between;
 

    flex-wrap: wrap;
    }

    .item{ 
      display: flex;
      align-items: center;
         /deep/.ant-input{
     border:  1px solid #3a4167;
     border-right: 0;
     }
     /deep/.ant-btn{
        height: 32px;
    border: 1px solid #3a4167;
     }
      /deep/ .ant-btn-primary{
        background-color: #ffffff !important;
      }
        margin-bottom: 20px;
        /deep/.ant-calendar-picker-input.ant-input{
          width: 270px;
	height: 35px;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #3a4167;
        }

        /deep/.ant-select:not(.ant-select-customize-input) .ant-select-selector{
       width: 270px;
	height: 35px;
	background-color: #ffffff;
	border-radius: 5px;
	border: solid 1px #3a4167;
        }
   
    
        .name{
 font-family: Microsoft YaHei;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 29px;
	letter-spacing: 0px;
	color: #5783ff;
  margin-right: 10px;
	
     }}
      .btn2{
       display: flex;
       justify-content: center;
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