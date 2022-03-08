<template>
    <div class="wra">
        <div class="main">
            <div class="left"></div>
            <div class="right">
                <div class="choose">
                    <div class="title">
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
      <a-input v-model:value="formState.main" type="text" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="密码" name="pass">
      <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
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
      <a-input v-model:value="formState.code" type="password" autocomplete="off"  >
           <template #addonAfter>
               <a href="" v-if="loading" @click.prevent="getCode">获取验证码</a>
        <a-spin  v-else/>
        </template>
     
      </a-input>
       
    </a-form-item>
    <div class="btn">
        
        <div>登录</div>
    </div>
 
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit" size = "middle" block = true>登录</a-button>
     
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
      select:'',
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
    height: 100vh;
    background-color: #f2f2f2;
    .main{
        display: flex;
        .left{
            width: 50%;
            height: 100%;
            background-color: #d7d7d7;
        }
        .right{
            background-color: #f8f8f8;
            width: 50%;
            height: 100%;
            .choose{
               margin-top: 40px;

            }
            .form{
                width: 100%;
                margin-left: 10%;
                margin-top: 40px;

             /deep/ .ant-btn-block{
                 width: 70%;
                 margin-top: 20px;
           
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

        width: 50%;
        height:55%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
}

</style>