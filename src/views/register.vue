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
                    <div class="register">
                        注册
                    </div>
               
  
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
    <a-form-item has-feedback label="密码" name="pass">
      <a-input v-model:value="formState.pass" type="password" autocomplete="off" placeholder="请输入密码" />
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
     <a-form-item has-feedback label="验证码" name="pass" class="code">
      <a-input v-model:value="formState.code" type="password" autocomplete="off" placeholder="请输入验证码"  >
           <template #addonAfter>
               <a href="" v-if="loading" @click.prevent="getCode">获取验证码</a>
        <a-spin  v-else/>
        </template>
     
      </a-input>
       
    </a-form-item>
    <div class="btn">
        
      
    </div>
 
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit" size = "middle" block = true>注册</a-button>
     
    </a-form-item>
  </a-form>
     </div>
  
   
                </div>
            </div>
        </div>
    
        
    </div>
</template>

<script>
import { defineComponent, ref,reactive } from 'vue';
export default defineComponent({
  setup() {
      //表单
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
    //获取邮箱验证码
    let loading = ref(true)
    function getCode(){
        loading.value = false
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


    };
  },

});
</script>

<style lang="less" scoped>
.wra{
    width: 100vw;
      background-image: url(../assets/login.png);
    height: 100vh;
    background-color: #f2f2f2;
    background-size: cover;
    .main::before{
   content:'';
    position:absolute;  /* 固定模糊层位置 */
    top:0;
    left:0;
    right:0;
    bottom:0;
    
    // background:url(../assets/bg.png) no-repeat center center fixed;/* 与上面的 bg 中的background设置一样 */
    filter:blur(10px) contrast(.8);  /* 值越大越模糊 */
    z-index:-1;  /* 模糊层在最下面 */
}

    .main{
      padding: 20px;
        display: flex;
         border: 1px solid ;
         border-radius: 20px;
        .left{
            width: 55%;
            height: 100%;
          background-image: url(../assets/bg.png);
            border-top-left-radius:20px;
            background-size: 100% 100%;

border-bottom-left-radius:20px;
        }
        .right{
            background-color: #f8f8f8;
            width: 45%;
               border-top-right-radius:20px;
border-bottom-right-radius:20px;
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
                color: gray;
              }
            }

            .register{
              margin: auto;
              font-size: 20px;
              margin-top: 10px;
            }
            .choose{
              

            }
            .form{
                width: 100%;
                margin-left: 10%;
                margin-top: 20px;
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
                 border: 10px;
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