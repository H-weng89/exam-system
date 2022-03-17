<template>
    <div class="wra">
        <div class="title">个人信息</div>
        <div class="second">
            <div class="left">修改个人信息</div>
            <div class="right">其中带*号必填</div>
        </div>
        <div class="main">
           <a-form
    name="custom-validation"
    ref="formRef"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item has-feedback label="邮箱" name="pass">
      <a-input v-model:value="formState.pass" type="text" autocomplete="off" >
           <template #suffix>
        <a>修改</a>
      </template>
      </a-input>
   
    </a-form-item>
    <a-form-item has-feedback label="姓名" name="checkPass">
      <a-input v-model:value="formState.checkPass" type="text" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="身份" name="checkPass">
      <a-input v-model:value="formState.checkPass" type="text" autocomplete="off" />
    </a-form-item><a-form-item has-feedback label="学校" name="checkPass">
      <a-input v-model:value="formState.checkPass" type="text" autocomplete="off" />
    </a-form-item><a-form-item has-feedback label="学号" name="checkPass">
      <a-input v-model:value="formState.checkPass" type="text" autocomplete="off" />
    </a-form-item><a-form-item has-feedback label="专业班级" name="checkPass">
      <a-input v-model:value="formState.checkPass" type="text" autocomplete="off" />
    </a-form-item>
     <a-form-item has-feedback label="备注信息" name="pass">
    <a-textarea v-model:value="formState.age" />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 10, offset: 4 }"  >
      <a-button type="primary" html-type="submit">确认</a-button>
     
    </a-form-item>
  </a-form>
        </div>
        
   
    </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  setup() {
    const formRef = ref();
    const formState = reactive({
      pass: '',
      checkPass: '',
      age: undefined,
    });

    // let checkAge = async (rule, value) => {
    //   if (!value) {
    //     return Promise.reject('Please input the age');
    //   }

    //   if (!Number.isInteger(value)) {
    //     return Promise.reject('Please input digits');
    //   } else {
    //     if (value < 18) {
    //       return Promise.reject('Age must be greater than 18');
    //     } else {
    //       return Promise.resolve();
    //     }
    //   }
    // };

    // let validatePass = async (rule, value) => {
    //   if (value === '') {
    //     return Promise.reject('Please input the password');
    //   } else {
    //     if (formState.checkPass !== '') {
    //       formRef.value.validateFields('checkPass');
    //     }

    //     return Promise.resolve();
    //   }
    // };

    // let validatePass2 = async (rule, value) => {
    //   if (value === '') {
    //     return Promise.reject('Please input the password again');
    //   } else if (value !== formState.pass) {
    //     return Promise.reject("Two inputs don't match!");
    //   } else {
    //     return Promise.resolve();
    //   }
    // };

    const rules = {
      pass: [
        {
          required: true,
         
          trigger: 'change',
        },
      ],
      checkPass: [
        {
         
        },
      ],
      age: [
        {
         
          trigger: 'change',
        },
      ], 
    };
    const layout = {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 15,
      },
    };

    const handleFinish = values => {
      console.log(values, formState);
    };

    const handleFinishFailed = errors => {
      console.log(errors);
    };

  

    return {
      formState,
      formRef,
      rules,
     
      layout,
      handleFinishFailed,
      handleFinish,
    
    };
  },
});
</script>

<style lang="less" scoped>
.wra{
     width: 98% !important;
    height: 95% !important;
  
    background-color: white;
    margin: auto;
    margin-top: 20px;
    .title{
        height: 8%;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        margin-left: 20px;
         padding-top: 10px;
       font-size: 20px;
    }
    .second{
        height: 6%;
        width: 98%;
        margin: auto;
        background-color:#f2f2f2;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .left{
            margin-left: 20px;
            margin-right: 20px;
            
        }
        .right{
            font-size: 12px;

           
        }

    
    }
    .main{
        width: 98%;
        margin: auto;
        margin-top: 20px;
        
 
      
      
    }
}

</style>