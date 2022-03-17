<template>
    <div class="wra">
     
        <div class="main">
            <div class="left"></div>
            <div class="right">
               <div class="title">
        <div class="first">废物</div>
        <div class="second">我们打造最没用的小废物</div>
      </div>
                <div class="choose">
                     <a-tabs v-model:activeKey="activeKey" centered>
    <a-tab-pane key="1" tab="密码登录">
     <div class="form">
            <a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @validate="handleValidate"
    @finishFailed="handleFinishFailed"
  >
    
    <a-form-item has-feedback label="邮箱" name="mail">
      <a-input v-model:value="formState.main" type="text" autocomplete="off"  placeholder="请输入邮箱"/>
    </a-form-item>
    <a-form-item has-feedback label="密码" name="pass">
      <a-input v-model:value="formState.pass" type="password" autocomplete="off" placeholder="请输入密码" />
    </a-form-item>
    <a-form-item
      name="select"
      label="身份"
      has-feedback
     
    >
      <a-select v-model:value="formState.select"  placeholder="Select a person">
        <a-select-option value="student">学生</a-select-option>
        <a-select-option value="teacher">老师</a-select-option>
          <a-select-option value="manager">管理员</a-select-option>
      </a-select>
    </a-form-item>
    <div class="btn">
        <div @click="register">立即注册</div>
        <div @click="forget">忘记密码</div>
    </div>
 
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit" size = "middle" block = true>登录</a-button>
     
    </a-form-item>
  </a-form>
     </div>
    </a-tab-pane>
    <a-tab-pane key="2" tab="邮箱登录" force-render>
        <div class="form">
            <a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @validate="handleValidate"
    @finishFailed="handleFinishFailed"
  >
    
    <a-form-item has-feedback label="邮箱" name="mail">
      <a-input v-model:value="formState.main" type="text" autocomplete="off" placeholder="请输入邮箱" />
    </a-form-item>
    <a-form-item has-feedback label="验证码" name="pass" class="code">
      <a-input v-model:value="formState.code" type="password" autocomplete="off" placeholder="请输入验证码"  >
           <template #addonAfter>
               <a href="" v-if="loading" @click.prevent="getCode">获取验证码</a>
        <a-spin  v-else/>
        </template>
     
      </a-input>
       
    </a-form-item>
    <a-form-item
      name="select"
      label="身份"
      has-feedback
     
    >
      <a-select v-model:value="formState.select" placeholder="Please select a country">
        <a-select-option value="student">学生</a-select-option>
        <a-select-option value="teacher">老师</a-select-option>
          <a-select-option value="manager">管理员</a-select-option>
      </a-select>
    </a-form-item>
    <div class="btn">
        <div @click="register">立即注册</div>
        <div @click="forget" >忘记密码</div>
    </div>
 
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit" size = "middle" :block ="true">登录</a-button>
     
    </a-form-item>
  </a-form>
     </div>
    </a-tab-pane>
   
  </a-tabs>
                </div>
            </div>
        </div>
    
        
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
import { defineComponent, ref,reactive } from 'vue';
export default defineComponent({
  setup() {
      //表单
      const router =  useRouter()
       const formRef = ref();
    const formState = reactive({
      pass: '',
      mail: '',
      select:'student',
      code:''
    //   age: undefined,
    });


        //邮箱验证
    let validatePass = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('Please input the password');
      } else {
        if (formState.checkPass !== '') {
          formRef.value.validateFields('checkPass');
        }

        return Promise.resolve();
      }
    };

  

    const rules = {
      mail: [{
        validator: validatePass,
        trigger: 'change',
        
      }],
    
    
    };
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    };

    const handleFinish = values => {
      console.log(values, formState);
    };

    const handleFinishFailed = errors => {
      console.log(errors);
    };

  

    const handleValidate = (...args) => {
      console.log(args);
    };
    //获取邮箱
    let loading = ref(true)
    function getCode(){
        loading.value = false
    }
    //跳转
     function register(){
       router.push('/register')
     }
     function forget(){
        router.push('/forget')
     }

    return {
      activeKey: ref('1'), //登录方式
      //表单
      formState,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      handleFinish,
      loading,
      getCode,
   
      handleValidate,
      forget,
      register


    };
  },

});
</script>

<style lang="less" scoped>
.wra{
    width: 100vw;
    height: 100vh;
    background-color: #f2f2f2;
    background-image: url(../assets/login.png);
    background-repeat: no-repeat;
    background-size: cover;
    .main{
        display: flex;
        border: 30px solid rgba(255, 255, 255, 0.1);
        z-index: 1;
        
      
       
        
        
        border-radius: 20px;
        .left{
          
            width: 55%;
            padding: 0;
            margin: 0;
         
            height: 100%;
            // border-radius: 20px;
            // background-color: #d7d7d7;
            background-image: url(../assets/bg.png);
            border-top-left-radius:20px;
             background-size: 100% 100%;
             
border-bottom-left-radius:20px;

         
        }
        .right{
            background-color: #f8f8f8;
            border-top-right-radius:20px;
border-bottom-right-radius:20px;
         
            width: 45%;
            height: 100%;
            .title{
              margin-top: 10px;

              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              margin-left: 60px;
              
              .first{
                font-size: 20px;
                font-weight: 600;
                color: #444444;
              }
              .second{
                color: #bebebe;
                margin-top: 5px;
              }
            }
            .choose{
               margin-top: 30px;

            }
            .form{
                width: 100%;
                margin-left: 10%;
             
                 /deep/.ant-input:placeholder-shown{
    border-radius: 7px;
  }
                /deep/.ant-input-group-addon{
                  position: absolute;
    top: 13%;
    z-index: 1;
    right: 35%;
    background-color: white !important;
    border: none !important;
                }

             /deep/ .ant-btn-block{
                 width: 70%;
                 margin-top: 20px;
                 background-color: #7c7cea;
                 border-radius: 10px;
           
             }
             a{
                 text-decoration: none;
              color: #2ba6ed;
             }

                
            }
            .btn{
                display: flex;
                justify-content: flex-end;
                margin-right: 25%;
                div{
                    margin-right: 10px;
                    color: #2ba6ed;
                    z-index: 1;
                }
                div:hover{
                    cursor: pointer;
                }
            }
       
                    }

        width: 60%;
        height:60%;
        position: absolute;
        left: 60%;
        top: 60%;
        transform: translate(-50%,-50%);
    }
}

</style>